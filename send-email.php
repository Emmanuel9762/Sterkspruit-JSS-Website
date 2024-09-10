<?php
// send-email.php

// Retrieve form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$subject = htmlspecialchars($_POST['subject']);
$message = htmlspecialchars($_POST['message']);

// Email destination
$to = "your-email@gmail.com";

// Email subject
$full_subject = "Contact Form Submission: " . $subject;

// Email headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Email body
$body = "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Message: \n" . $message;

// Send email
if(mail($to, $full_subject, $body, $headers)) {
    // Email sent successfully
    echo "Thank you, your message has been sent.";
} else {
    // Email failed to send
    echo "Sorry, something went wrong. Please try again later.";
}
?>
