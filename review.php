<?php
// Set headers
header('Content-Type: application/json');

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$rating = $_POST['rating'] ?? 0;
$review = $_POST['review'] ?? '';

// Validate required fields
if (empty($name) || empty($email) || empty($review) || $rating < 1 || $rating > 5) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields and provide a valid rating']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address']);
    exit;
}

// Load existing reviews
$reviewsFile = 'reviews.json';
$reviews = [];

if (file_exists($reviewsFile)) {
    $reviews = json_decode(file_get_contents($reviewsFile), true);
    if (!is_array($reviews)) {
        $reviews = [];
    }
}

// Add new review
$newReview = [
    'name' => $name,
    'email' => $email,
    'rating' => (int)$rating,
    'review' => $review,
    'date' => date('F j, Y')
];

$reviews[] = $newReview;

// Save reviews
if (file_put_contents($reviewsFile, json_encode($reviews, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true, 'message' => 'Thank you for your review!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error saving your review. Please try again.']);
}
?>