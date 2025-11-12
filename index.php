<?php
session_start(
error_reporting(E_ALL
ini_set('display_errors' 1

define('SITE_NAME' 'ATS Group Pakistan'
define('SITE_URL' 'https://www.atsgroup.pk'
define('COMPANY_PHONE' '+92-42-1234567'
define('COMPANY_EMAIL' 'info@atsgroup.pk'
define('COMPANY_ADDRESS' 'Main Boulevard, Lahore, Pakistan'
define('ADMIN_EMAIL' 'admin@atsgroup.pk'

class DatabaseConfig {
    private $host = 'localhost'
    private $db_name = 'atsgroup_pk_db'
    private $username = 'atsgroup_user'
    private $password = 'atsgroup_pass123'
    public $conn

    public function getConnection() {
        $this->conn = null
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password
            $this->conn->exec("set names utf8mb4"
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION
        } catch(PDOException $exception) {
            throw new Exception("Database connection failed: " . $exception->getMessage()
        }
        return $this->conn
    }
}

class ProjectManager {
    private $conn
    private $table_name = "projects"

    public $project_id
    public $project_title
    public $project_description
    public $project_image
    public $project_category
    public $project_status
    public $project_location
    public $project_area
    public $project_budget
    public $start_date
    public $end_date
    public $created_at
    public $updated_at

    public function __construct($db) {
        $this->conn = $db
    }

    public function createProject() {
        $query = "INSERT INTO " . $this->table_name . " SET project_title=:project_title, project_description=:project_description, project_image=:project_image, project_category=:project_category, project_status=:project_status, project_location=:project_location, project_area=:project_area, project_budget=:project_budget, start_date=:start_date, end_date=:end_date"
        
        $stmt = $this->conn->prepare($query
        
        $stmt->bindParam(":project_title", $this->project_title
        $stmt->bindParam(":project_description", $this->project_description
        $stmt->bindParam(":project_image", $this->project_image
        $stmt->bindParam(":project_category", $this->project_category
        $stmt->bindParam(":project_status", $this->project_status
        $stmt->bindParam(":project_location", $this->project_location
        $stmt->bindParam(":project_area", $this->project_area
        $stmt->bindParam(":project_budget", $this->project_budget
        $stmt->bindParam(":start_date", $this->start_date
        $stmt->bindParam(":end_date", $this->end_date
        
        if($stmt->execute()) {
            return true
        }
        return false
    }

    public function readAllProjects() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC"
        $stmt = $this->conn->prepare($query
        $stmt->execute()
        return $stmt
    }

    public function readProjectsByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE project_category = ? ORDER BY created_at DESC"
        $stmt = $this->conn->prepare($query
        $stmt->bindParam(1, $category
        $stmt->execute()
        return $stmt
    }

    public function updateProject() {
        $query = "UPDATE " . $this->table_name . " SET project_title=:project_title, project_description=:project_description, project_image=:project_image, project_category=:project_category, project_status=:project_status, project_location=:project_location, project_area=:project_area, project_budget=:project_budget, start_date=:start_date, end_date=:end_date, updated_at=NOW() WHERE project_id=:project_id"
        
        $stmt = $this->conn->prepare($query
        
        $stmt->bindParam(":project_title", $this->project_title
        $stmt->bindParam(":project_description", $this->project_description
        $stmt->bindParam(":project_image", $this->project_image
        $stmt->bindParam(":project_category", $this->project_category
        $stmt->bindParam(":project_status", $this->project_status
        $stmt->bindParam(":project_location", $this->project_location
        $stmt->bindParam(":project_area", $this->project_area
        $stmt->bindParam(":project_budget", $this->project_budget
        $stmt->bindParam(":start_date", $this->start_date
        $stmt->bindParam(":end_date", $this->end_date
        $stmt->bindParam(":project_id", $this->project_id
        
        if($stmt->execute()) {
            return true
        }
        return false
    }

    public function deleteProject() {
        $query = "DELETE FROM " . $this->table_name . " WHERE project_id = ?"
        $stmt = $this->conn->prepare($query
        $stmt->bindParam(1, $this->project_id
        
        if($stmt->execute()) {
            return true
        }
        return false
    }
}

class ServiceManager {
    private $conn
    private $table_name = "services"

    public $service_id
    public $service_name
    public $service_description
    public $service_icon
    public $service_price_range
    public $service_duration
    public $service_features
    public $service_status
    public $created_at

    public function __construct($db) {
        $this->conn = $db
    }

    public function createService() {
        $query = "INSERT INTO " . $this->table_name . " SET service_name=:service_name, service_description=:service_description, service_icon=:service_icon, service_price_range=:service_price_range, service_duration=:service_duration, service_features=:service_features, service_status=:service_status"
        
        $stmt = $this->conn->prepare($query
        
        $stmt->bindParam(":service_name", $this->service_name
        $stmt->bindParam(":service_description", $this->service_description
        $stmt->bindParam(":service_icon", $this->service_icon
        $stmt->bindParam(":service_price_range", $this->service_price_range
        $stmt->bindParam(":service_duration", $this->service_duration
        $stmt->bindParam(":service_features", $this->service_features
        $stmt->bindParam(":service_status", $this->service_status
        
        if($stmt->execute()) {
            return true
        }
        return false
    }

    public function readAllServices() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE service_status='active' ORDER BY created_at DESC"
        $stmt = $this->conn->prepare($query
        $stmt->execute()
        return $stmt
    }
}

class ContactManager {
    private $conn
    private $table_name = "contacts"

    public $contact_id
    public $contact_name
    public $contact_email
    public $contact_phone
    public $contact_subject
    public $contact_message
    public $contact_status
    public $created_at

    public function __construct($db) {
        $this->conn = $db
    }

    public function createContact() {
        $query = "INSERT INTO " . $this->table_name . " SET contact_name=:contact_name, contact_email=:contact_email, contact_phone=:contact_phone, contact_subject=:contact_subject, contact_message=:contact_message, contact_status=:contact_status"
        
        $stmt = $this->conn->prepare($query
        
        $stmt->bindParam(":contact_name", $this->contact_name
        $stmt->bindParam(":contact_email", $this->contact_email
        $stmt->bindParam(":contact_phone", $this->contact_phone
        $stmt->bindParam(":contact_subject", $this->contact_subject
        $stmt->bindParam(":contact_message", $this->contact_message
        $stmt->bindParam(":contact_status", $this->contact_status
        
        if($stmt->execute()) {
            return true
        }
        return false
    }

    public function readAllContacts() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC"
        $stmt = $this->conn->prepare($query
        $stmt->execute()
        return $stmt
    }
}

class UserManager {
    private $conn
    private $table_name = "users"

    public $user_id
    public $user_name
    public $user_email
    public $user_password
    public $user_role
    public $user_status
    public $created_at

    public function __construct($db) {
        $this->conn = $db
    }

    public function createUser() {
        $query = "INSERT INTO " . $this->table_name . " SET user_name=:user_name, user_email=:user_email, user_password=:user_password, user_role=:user_role, user_status=:user_status"
        
        $stmt = $this->conn->prepare($query
        
        $this->user_password = password_hash($this->user_password, PASSWORD_DEFAULT
        
        $stmt->bindParam(":user_name", $this->user_name
        $stmt->bindParam(":user_email", $this->user_email
        $stmt->bindParam(":user_password", $this->user_password
        $stmt->bindParam(":user_role", $this->user_role
        $stmt->bindParam(":user_status", $this->user_status
        
        if($stmt->execute()) {
            return true
        }
        return false
    }

    public function loginUser($email, $password) {
        $query = "SELECT user_id, user_name, user_email, user_password, user_role FROM " . $this->table_name . " WHERE user_email = ? AND user_status = 'active'"
        $stmt = $this->conn->prepare($query
        $stmt->bindParam(1, $email
        $stmt->execute()
        
        if($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC
            if(password_verify($password, $row['user_password'])) {
                $this->user_id = $row['user_id']
                $this->user_name = $row['user_name']
                $this->user_email = $row['user_email']
                $this->user_role = $row['user_role']
                return true
            }
        }
        return false
    }
}

class EmailManager {
    public function sendContactEmail($name, $email, $subject, $message) {
        $to = COMPANY_EMAIL
        $headers = "From: " . $email . "\r\n"
        $headers .= "Reply-To: " . $email . "\r\n"
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n"
        
        $email_body = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
        </head>
        <body>
            <h2>New Contact Message from ATS Group Website</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        </body>
        </html>
        "
        
        if(mail($to, $subject, $email_body, $headers)) {
            return true
        }
        return false
    }
}

$database = new DatabaseConfig()
try {
    $db = $database->getConnection()
} catch(Exception $e) {
    die("Database connection failed: " . $e->getMessage()
}

$project_manager = new ProjectManager($db
$service_manager = new ServiceManager($db
$contact_manager = new ContactManager($db
$user_manager = new UserManager($db
$email_manager = new EmailManager()

if(isset($_POST['contact_submit'])) {
    $contact_manager->contact_name = $_POST['contact_name']
    $contact_manager->contact_email = $_POST['contact_email']
    $contact_manager->contact_phone = $_POST['contact_phone']
    $contact_manager->contact_subject = $_POST['contact_subject']
    $contact_manager->contact_message = $_POST['contact_message']
    $contact_manager->contact_status = 'unread'
    
    if($contact_manager->createContact()) {
        $email_manager->sendContactEmail($_POST['contact_name'], $_POST['contact_email'], $_POST['contact_subject'], $_POST['contact_message']
        $contact_success = "Thank you for your message. We will get back to you soon!"
    } else {
        $contact_error = "Sorry, there was an error sending your message. Please try again."
    }
}

if(isset($_POST['login_submit'])) {
    $email = $_POST['user_email']
    $password = $_POST['user_password']
    
    if($user_manager->loginUser($email, $password)) {
        $_SESSION['user_id'] = $user_manager->user_id
        $_SESSION['user_name'] = $user_manager->user_name
        $_SESSION['user_email'] = $user_manager->user_email
        $_SESSION['user_role'] = $user_manager->user_role
        header("Location: admin/dashboard.php"
        exit()
    } else {
        $login_error = "Invalid email or password!"
    }
}

function getProjectCount($db) {
    $query = "SELECT COUNT(*) as total FROM projects"
    $stmt = $db->prepare($query
    $stmt->execute()
    $row = $stmt->fetch(PDO::FETCH_ASSOC
    return $row['total']
}

function getServiceCount($db) {
    $query = "SELECT COUNT(*) as total FROM services WHERE service_status='active'"
    $stmt = $db->prepare($query
    $stmt->execute()
    $row = $stmt->fetch(PDO::FETCH_ASSOC
    return $row['total']
}

function getActiveProjects($db) {
    $query = "SELECT COUNT(*) as total FROM projects WHERE project_status='active'"
    $stmt = $db->prepare($query
    $stmt->execute()
    $row = $stmt->fetch(PDO::FETCH_ASSOC
    return $row['total']
}

$total_projects = getProjectCount($db
$total_services = getServiceCount($db
$active_projects = getActiveProjects($db
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Leading Construction Company in Pakistan</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-building"></i> <?php echo SITE_NAME; ?>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.php">About Us</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown">
                            Services
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="services.php">All Services</a></li>
                            <li><a class="dropdown-item" href="construction.php">Construction</a></li>
                            <li><a class="dropdown-item" href="renovation.php">Renovation</a></li>
                            <li><a class="dropdown-item" href="architecture.php">Architecture</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="projects.php">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.php">Contact</a></li>
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <li class="nav-item"><a class="nav-link" href="admin/dashboard.php">Dashboard</a></li>
                        <li class="nav-item"><a class="nav-link" href="logout.php">Logout</a></li>
                    <?php else: ?>
                        <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid p-0">
        <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="assets/images/slide1.jpg" class="d-block w-100" alt="Construction Projects">
                    <div class="carousel-caption d-none d-md-block">
                        <h2>Building Your Dreams</h2>
                        <p>Quality construction services across Pakistan</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="assets/images/slide2.jpg" class="d-block w-100" alt="Architecture Design">
                    <div class="carousel-caption d-none d-md-block">
                        <h2>Innovative Designs</h2>
                        <p>Modern architecture and planning</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="assets/images/slide3.jpg" class="d-block w-100" alt="Project Management">
                    <div class="carousel-caption d-none d-md-block">
                        <h2>Project Management</h2>
                        <p>Complete project lifecycle management</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    </div>

    <section class="stats-section py-5 bg-light">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-primary"><?php echo $total_projects; ?></h3>
                        <p>Completed Projects</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-primary"><?php echo $active_projects; ?></h3>
                        <p>Active Projects</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-primary"><?php echo $total_services; ?></h3>
                        <p>Services</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-primary">15+</h3>
                        <p>Years Experience</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services-section py-5">
        <div class="container">
            <h2 class="text-center mb-5">Our Services</h2>
            <div class="row">
                <?php
                $services = $service_manager->readAllServices()
                if($services->rowCount() > 0) {
                    while($row = $services->fetch(PDO::FETCH_ASSOC)) {
                        echo '
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card service-card h-100">
                                <div class="card-body text-center">
                                    <i class="' . $row['service_icon'] . ' fa-3x text-primary mb-3"></i>
                                    <h5 class="card-title">' . $row['service_name'] . '</h5>
                                    <p class="card-text">' . $row['service_description'] . '</p>
                                    <div class="service-features">
                                        ' . $row['service_features'] . '
                                    </div>
                                </div>
                            </div>
                        </div>'
                    }
                } else {
                    echo '<div class="col-12 text-center"><p>No services available at the moment.</p></div>'
                }
                ?>
            </div>
        </div>
    </section>

    <section class="projects-section py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Recent Projects</h2>
            <div class="row">
                <?php
                $projects = $project_manager->readAllProjects()
                $project_count = 0
                while($row = $projects->fetch(PDO::FETCH_ASSOC) && $project_count < 6) {
                    echo '
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card project-card h-100">
                            <img src="assets/images/projects/' . $row['project_image'] . '" class="card-img-top" alt="' . $row['project_title'] . '">
                            <div class="card-body">
                                <h5 class="card-title">' . $row['project_title'] . '</h5>
                                <p class="card-text">' . substr($row['project_description'], 0, 100) . '...</p>
                                <div class="project-meta">
                                    <span class="badge bg-primary">' . $row['project_category'] . '</span>
                                    <span class="badge bg-secondary">' . $row['project_status'] . '</span>
                                </div>
                            </div>
                        </div>
                    </div>'
                    $project_count++
                }
                ?>
            </div>
            <div class="text-center mt-4">
                <a href="projects.php" class="btn btn-primary btn-lg">View All Projects</a>
            </div>
        </div>
    </section>

    <section class="contact-section py-5">
        <div class="container">
            <h2 class="text-center mb-5">Get In Touch</h2>
            <div class="row">
                <div class="col-lg-6">
                    <?php
                    if(isset($contact_success)) {
                        echo '<div class="alert alert-success">' . $contact_success . '</div>'
                    }
                    if(isset($contact_error)) {
                        echo '<div class="alert alert-danger">' . $contact_error . '</div>'
                    }
                    ?>
                    <form method="POST" action="">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <input type="text" name="contact_name" class="form-control" placeholder="Your Name" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <input type="email" name="contact_email" class="form-control" placeholder="Your Email" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <input type="text" name="contact_phone" class="form-control" placeholder="Your Phone">
                        </div>
                        <div class="mb-3">
                            <input type="text" name="contact_subject" class="form-control" placeholder="Subject" required>
                        </div>
                        <div class="mb-3">
                            <textarea name="contact_message" class="form-control" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" name="contact_submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
                <div class="col-lg-6">
                    <div class="contact-info">
                        <h4>Contact Information</h4>
                        <div class="contact-item mb-3">
                            <i class="fas fa-map-marker-alt text-primary me-2"></i>
                            <strong>Address:</strong> <?php echo COMPANY_ADDRESS; ?>
                        </div>
                        <div class="contact-item mb-3">
                            <i class="fas fa-phone text-primary me-2"></i>
                            <strong>Phone:</strong> <?php echo COMPANY_PHONE; ?>
                        </div>
                        <div class="contact-item mb-3">
                            <i class="fas fa-envelope text-primary me-2"></i>
                            <strong>Email:</strong> <?php echo COMPANY_EMAIL; ?>
                        </div>
                        <div class="contact-item mb-3">
                            <i class="fas fa-clock text-primary me-2"></i>
                            <strong>Business Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM
                        </div>
                    </div>
                    <div class="map-container mt-4">
                        <iframe src="https://maps.google.com/maps?q=lahore&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5><?php echo SITE_NAME; ?></h5>
                    <p>Leading construction and engineering company in Pakistan with over 15 years of experience in delivering quality projects.</p>
                    <div class="social-links">
                        <a href="#" class="text-white me-3"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="index.php" class="text-white">Home</a></li>
                        <li><a href="about.php" class="text-white">About</a></li>
                        <li><a href="services.php" class="text-white">Services</a></li>
                        <li><a href="projects.php" class="text-white">Projects</a></li>
                        <li><a href="contact.php" class="text-white">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Our Services</h5>
                    <ul class="list-unstyled">
                        <li><a href="construction.php" class="text-white">Construction</a></li>
                        <li><a href="renovation.php" class="text-white">Renovation</a></li>
                        <li><a href="architecture.php" class="text-white">Architecture</a></li>
                        <li><a href="interior.php" class="text-white">Interior Design</a></li>
                        <li><a href="consultancy.php" class="text-white">Consultancy</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Newsletter</h5>
                    <p>Subscribe to our newsletter for updates.</p>
                    <form>
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Your Email">
                            <button class="btn btn-primary" type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <hr class="my-4">
            <div class="row">
                <div class="col-md-6">
                    <p>&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="privacy.php" class="text-white me-3">Privacy Policy</a>
                    <a href="terms.php" class="text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>