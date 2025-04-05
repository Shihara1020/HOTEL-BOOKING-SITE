<?php
// Set headers
header('Content-Type: application/json');

// Database connection (you'll need to set this up)
$servername = "localhost";
$username = 'root';
$password = '';
$dbname = "hotel_management";
$charset = 'utf8mb4';
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$checkin = $_POST['checkin'] ?? '';
$checkout = $_POST['checkout'] ?? '';
$adults = $_POST['adults'] ?? 1;
$children = $_POST['children'] ?? 0;
$room_type = $_POST['room_type'] ?? '';
$special_requests = $_POST['special_requests'] ?? '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($checkin) || empty($checkout) || empty($room_type)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

// Validate dates
if (strtotime($checkout) <= strtotime($checkin)) {
    echo json_encode(['success' => false, 'message' => 'Check-out date must be after check-in date']);
    exit;
}

// Insert booking into database
try {
    $stmt = $conn->prepare("INSERT INTO onlinebookings (name, email, phone, checkin_date, checkout_date, adults, children, room_type, special_requests, created_at) 
                           VALUES (:name, :email, :phone, :checkin, :checkout, :adults, :children, :room_type, :special_requests, NOW())");
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':checkin', $checkin);
    $stmt->bindParam(':checkout', $checkout);
    $stmt->bindParam(':adults', $adults, PDO::PARAM_INT);
    $stmt->bindParam(':children', $children, PDO::PARAM_INT);
    $stmt->bindParam(':room_type', $room_type);
    $stmt->bindParam(':special_requests', $special_requests);
    
    $stmt->execute();
    
    // In a real application, you would send a confirmation email here
    
    echo json_encode(['success' => true, 'message' => 'Booking successful! We will contact you shortly to confirm your reservation.']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error processing your booking. Please try again.']);
}
?>