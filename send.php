<?php
$_POST = json_decode( file_get_contents("php://input"), true );

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// require 'phpmailer/PHPMailer.php';
// require 'phpmailer/SMTP.php';
// require 'phpmailer/Exception.php';


// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$date = $_POST['date'];
$service = $_POST['service'];
$requirement = $_POST['requirement'];
$comment = $_POST['comment'];
$file = $_FILES['myfile'];

// Формирование самого письма
$title = "Заявка с сайта Prime Moving";
$body = "<h2>Заявка с сайта Prime Moving</h2>
<b>Имя:</b> $name<br><br>
<b>Телефон:</b> $phone<br><br>
<b>Почта:</b> $email<br><br>
<b>Дата:</b> $date<br><br>
<b>Выбраный сервис:</b> $service<br><br>
<b>Выбраный требования:</b> $requirement<br><br>
<b>Комментарий клиента:</b> $comment<br><br>
";

// $body = "
// <h2>Заявка с сайта Prime Moving</h2>
// <b>Имя:</b> $name><br>
// <b>Телефон:</b> $phone<br><br>
// <b>Почта:</b> $email<br><br>
// ";

// if(!empty($_POST['age-metric'])){
//     $body.='<p><strong>Возраст (лет):</strong>' .$_POST['age-metric'].'</p>';
// }



// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // // Настройки вашей почты
    // $mail->Host       = 'mail.adm.tools'; // SMTP сервера вашей почты
    // $mail->Username   = 'info@zshop.biz.ua'; // Логин на почте
    // $mail->Password   = 'ZshoP147#'; // Пароль на почте
    // $mail->SMTPSecure = 'ssl';
    // $mail->Port       = 465;
    // $mail->setFrom('info@zshop.biz.ua', 'Keto'); // Адрес самой почты и имя отправителя
    
    // Настройки вашей почты
    $mail->Host       = 'primemovingcompany.ca'; // SMTP сервера вашей почты
    $mail->Username   = 'adminuser@primemovingcompany.ca'; // Логин на почте
    $mail->Password   = 'Prime4774@'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('adminuser@primemovingcompany.ca', 'admin'); // Адрес самой почты и имя отправителя

    // Получатель письма
    // $mail->addAddress('bartsimpson147@gmail.com');
    $mail->addAddress('primemovingcompany@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = 'success';} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "name" => $name, "resultfile" => $rfile, "status" => $status]);

// header('Location: index.html');
exit();