<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function OGP(Request $request)
    {
        $exploded_message = explode(" ",$request->message);
        foreach($exploded_message as $str){
            $message_link = str_replace("\n", "", $str);
            $str = $message_link;
            //if(filter_var($str, FILTER_VALIDATE_URL)) to keep just in case
            //{
                if (@file_get_contents("https://".$str."")) {
                    $str = "https://".$str."";
                } elseif(@file_get_contents("http://".$str."")){
                    $str = "http://".$str."";
                }

                try {
                    $sites_html = file_get_contents($str);
                } catch (\ErrorException $th) {
                    return response()->json([
                        "status" => "error",
                        "message" => "website is unreachable!"
                    ]);
                }

                // $data = OpenGraph::fetch($str, true);
                // return $data;

                //https://stackoverflow.com/questions/2107759/php-file-get-contents-and-setting-request-headers
                $opts = [
                    "http" => [
                        "method" => "GET",
                        "header" => 
                            "Accept-Language: en-US,en;q=0.5\r\n" .
                            "Cookie: foo=bar\r\n" .
                            "Content-Language: en-US\r\n" .
                            "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
                    ]
                ];

                $context = stream_context_create($opts);


                $sites_html = file_get_contents($str, false, $context);
                $html = new \DOMDocument();
                $sites_html = mb_convert_encoding($sites_html, 'HTML-ENTITIES', "UTF-8");
                @$html->loadHTML($sites_html);
                $meta_og_img = null;
                $meta_og_title = null;
                $meta_og_description = null;
                $backup_metas = get_meta_tags($str);
                $siteTitle = "";
                $favico = null;
                $hostname = parse_url($str, PHP_URL_HOST);
                $ass = [];
                foreach($html->getElementsByTagName('title') as $title){
                    $siteTitle = $title->nodeValue;
                    array_push($ass,$title->nodeValue);
                }
                foreach($html->getElementsByTagName('link') as $link){
                    if(strtolower($link->getAttribute('rel')=="shortcut icon")){
                        $favico = $link->getAttribute('href');
                    }
                }

                foreach($html->getElementsByTagName('meta') as $meta) {
                    if(strtolower($meta->getAttribute('property'))=='og:image'){
                        $meta_og_img = $meta->getAttribute('content');
                    }
                    if(strtolower($meta->getAttribute('property'))=='og:title'){
                        $meta_og_title = $meta->getAttribute('content');
                    }
                    if(strtolower($meta->getAttribute('property'))=='og:description'){
                        $meta_og_description = $meta->getAttribute('content');
                    }
                }
                $does_img_work = false;
                $does_favico_work = false;
                $does_new_img_work = false;
                $try = explode('.com',$str);//the string before .com
                if(filter_var($meta_og_img, FILTER_VALIDATE_URL)){
                    if(is_array(@getimagesize($meta_og_img))){
                        $does_img_work = true;
                    }
                }else{
                    $new_img_url = "".$try[0].".com/".$meta_og_img."";
                    if(filter_var($new_img_url, FILTER_VALIDATE_URL)){
                        if(is_array(@getimagesize($new_img_url))){
                            $does_new_img_work = true;
                        }
                    }
                }

                if(!filter_var($favico, FILTER_VALIDATE_URL)){
                    if(is_array(@getimagesize($favico))){
                        $does_favico_work = true;
                    }elseif(is_array(@getimagesize("".parse_url($str, PHP_URL_HOST)."".$favico.""))){
                        $does_favico_work = true;
                        $favico = "".parse_url($str, PHP_URL_HOST).".".$favico."";
                    }elseif(is_array(@getimagesize("https://".parse_url($str, PHP_URL_HOST)."".$favico.""))){
                        $does_favico_work = true;
                        $favico = "https://".parse_url($str, PHP_URL_HOST)."".$favico."";
                    }
                }

                if(isset($meta_og_description) && !empty($meta_og_description)){
                    $description = $meta_og_description;
                }else{
                    if(isset($backup_metas["description"]) && !empty($backup_metas["description"])){
                        $description = $backup_metas["description"];
                    }else{
                        $description = $hostname;
                    }
                }

                if($this->fixedOGImages($str)){
                    $image = $this->fixedOGImages($str);
                }elseif(isset($meta_og_img) && !empty($meta_og_img)){
                    if($does_img_work){
                        $image = $meta_og_img;
                    }else{
                        if($does_new_img_work){
                            $image = $new_img_url;
                        }else{
                            if(isset($favico) && $does_favico_work){
                                $image = $favico;
                            }else{
                                $image = "";
                            }
                        }
                    }
                }else{
                    if(isset($favico) && $does_favico_work){
                        $image = $favico;
                    }else{
                        $image = "";
                    }
                }
                if(isset($meta_og_title) && !empty($meta_og_title)){
                    $title = $meta_og_title;
                }else{
                    if(isset($siteTitle) && !empty($siteTitle)){
                        $title = $siteTitle;
                    }else{
                        $title = $hostname;
                    }
                }


                return response()->json([
                    'description'   => str_limit(trim($description),110),
                    'img'           => $image,
                    'title'         => str_limit(trim($title),35),
                    'backups'       => $backup_metas,
                    'link'          => $str,
                    'bool'          => $does_new_img_work,
                    'ogp'           => $meta_og_description,
                    'hostname'      => $hostname,
                    'favi'          => "https://".parse_url($str, PHP_URL_HOST)."".$favico.""
                ]);
        // }
        }
    }

    private function fixedOGImages($link)
    { //if desparate for a pic in og hehe
        if (strpos($link, 'www.') !== false) {
            $site_name = explode('.com',explode('www.',$link)[1])[0];
        }else{
            $site_name = explode('.com',explode('://',$link)[1])[0];
        }
         //assuming format of $link is https://www.sitename.com/blahblah - will use regex next time hehe
        switch($site_name){
            case "google":
                return "https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png";
                break;
            case "facebook":
                return "https://image.flaticon.com/icons/svg/124/124010.svg";
                break;
            default:
                return null;
        }
    }
    
}
