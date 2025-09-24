### **1. HTTPS Certificate**

**Question:** What does an SSL/TLS certificate do?
- A. Encrypts data and verifies server identity
- B. Speeds up website loading
- C. Prevents SQL Injection
- D. Tracks user behavior

**Answer:** A ✅
**Explanation:** SSL/TLS encrypts data in transit and authenticates the server to prevent MITM attacks.

---

### **2. XSS Types**

**Question:** Which of the following is a type of XSS attack?
- A. Stored XSS
- B. Reflected XSS
- C. DOM-based XSS
- D. All of the above

**Answer:** D ✅
**Explanation:** XSS can occur via stored data, reflected inputs, or client-side DOM manipulation.

---

### **3. CSRF Token**

**Question:** Why are CSRF tokens important?
- A. To prevent unauthorized actions from malicious websites
- B. To encrypt user passwords
- C. To track user sessions
- D. To validate email addresses

**Answer:** A ✅

---

### **4. HTTP Header Security**

**Question:** Which header helps prevent clickjacking?
- A. X-Frame-Options
- B. Content-Security-Policy
- C. X-Content-Type-Options
- D. Set-Cookie

**Answer:** A ✅

---

### **5. CORS**

**Question:** Cross-Origin Resource Sharing (CORS) is used to:
- A. Allow or restrict resources between different domains
- B. Encrypt all HTTP requests
- C. Authenticate users
- D. Prevent phishing

**Answer:** A ✅

---

### **6. SQL Injection Example**

**Question:** Which query is vulnerable to SQL injection?
- A. `SELECT * FROM users WHERE id = ${userId}`
- B. `SELECT * FROM users WHERE id = ?` (parameterized)
- C. `SELECT * FROM users WHERE id = ? AND password = ?`
- D. All of the above

**Answer:** A ✅

---

### **7. Password Salting**

**Question:** What is the purpose of adding salt to passwords?
- A. Prevents rainbow table attacks
- B. Speeds up hashing
- C. Makes passwords visible in logs
- D. Encrypts passwords with SSL

**Answer:** A ✅

---

### **8. MITM Attack**

**Question:** A Man-in-the-Middle attack can be mitigated by:
- A. Using HTTPS/TLS
- B. Using HTTP only
- C. Storing passwords in plain text
- D. Disabling firewalls

**Answer:** A ✅

---

### **9. Session Hijacking**

**Question:** What can help prevent session hijacking?
- A. HttpOnly cookies
- B. Short session expiration
- C. Secure cookie flag
- D. All of the above

**Answer:** D ✅

---

### **10. Brute Force Protection**

**Question:** Which technique helps prevent brute force login attacks?
- A. Rate limiting / account lockout
- B. Using GET for login
- C. Storing passwords in plain text
- D. Disabling HTTPS

**Answer:** A ✅

---

### **11. Input Validation**

**Question:** Proper input validation can prevent:
- A. SQL Injection
- B. XSS
- C. Command Injection
- D. All of the above

**Answer:** D ✅

---

### **12. Security Misconfiguration**

**Question:** Which of these is an example of security misconfiguration?
- A. Exposed admin interface
- B. Default passwords left unchanged
- C. Verbose error messages revealing system info
- D. All of the above

**Answer:** D ✅

---

### **13. Directory Traversal**

**Question:** Directory traversal attacks attempt to:
- A. Access files outside the intended web root
- B. Inject SQL commands
- C. Perform XSS
- D. Bypass HTTPS

**Answer:** A ✅

---

### **14. TLS Versions**

**Question:** Which TLS version is considered secure?
- A. TLS 1.2 and 1.3
- B. TLS 1.0
- C. SSL 3.0
- D. All of the above

**Answer:** A ✅

---

### **15. Content Security Policy (CSP)**

**Question:** What is the main goal of CSP?
- A. Restrict resources (scripts, images, etc.) to trusted sources
- B. Encrypt database entries
- C. Store cookies securely
- D. Prevent DDoS attacks

**Answer:** A ✅

---

### **16. DDoS Attack**

**Question:** What is the main purpose of a Distributed Denial-of-Service (DDoS) attack?
- A. Overwhelm a server to make it unavailable
- B. Steal user credentials
- C. Inject malicious scripts
- D. Bypass firewalls

**Answer:** A ✅

---

### **17. OAuth**

**Question:** OAuth is mainly used for:
- A. Authorization (granting access to resources)
- B. Encrypting data in transit
- C. Preventing SQL Injection
- D. Tracking user sessions

**Answer:** A ✅

---

### **18. JWT (JSON Web Token)**

**Question:** Which of the following is true about JWT?
- A. It is stateless and contains encoded claims
- B. It encrypts passwords
- C. It is only used for database transactions
- D. It replaces SSL/TLS

**Answer:** A ✅

---

### **19. DNS Spoofing**

**Question:** DNS spoofing attacks aim to:
- A. Redirect traffic to malicious sites
- B. Steal cookies from browsers
- C. Inject SQL commands
- D. Exploit XSS vulnerabilities

**Answer:** A ✅

---

### **20. HSTS (HTTP Strict Transport Security)**

**Question:** What is the purpose of HSTS?
- A. Force browsers to use HTTPS
- B. Encrypt database passwords
- C. Track user sessions
- D. Prevent XSS attacks

**Answer:** A ✅

---

### **21. Secure Cookie Flags**

**Question:** Which flags enhance cookie security?
- A. HttpOnly and Secure
- B. Expires and Path
- C. Domain only
- D. Max-Age only

**Answer:** A ✅

---

### **22. Clickjacking**

**Question:** How can clickjacking attacks be prevented?
- A. Using `X-Frame-Options: DENY` or `SAMEORIGIN`
- B. Encrypting cookies
- C. Disabling JavaScript
- D. Using GET instead of POST

**Answer:** A ✅

---

### **23. API Key Exposure**

**Question:** Storing API keys in client-side JavaScript is:
- A. Insecure, anyone can see and use them
- B. Secure
- C. Mandatory for OAuth
- D. Recommended for caching

**Answer:** A ✅

---

### **24. Input Sanitization**

**Question:** What is the main purpose of input sanitization?
- A. Remove malicious characters to prevent XSS or SQL Injection
- B. Encrypt all user inputs
- C. Validate SSL certificates
- D. Prevent MITM attacks

**Answer:** A ✅

---

### **25. Server-Side Validation**

**Question:** Why is server-side validation necessary even if client-side validation exists?
- A. Client-side validation can be bypassed by attackers
- B. To speed up website loading
- C. To store passwords securely
- D. To encrypt cookies

**Answer:** A ✅

---

### **26. HTTP Security Headers**

**Question:** Which header prevents MIME-type sniffing attacks?
- A. `X-Content-Type-Options: nosniff`
- B. `X-Frame-Options`
- C. `Strict-Transport-Security`
- D. `Content-Security-Policy`

**Answer:** A ✅

---

### **27. Phishing Prevention**

**Question:** Which method helps prevent phishing attacks?
- A. Implementing email SPF, DKIM, DMARC
- B. Using GET requests for login forms
- C. Disabling HTTPS
- D. Storing passwords in plain text

**Answer:** A ✅

---

### **28. Brute Force Mitigation**

**Question:** CAPTCHA is primarily used to:
- A. Prevent automated login attempts
- B. Encrypt passwords
- C. Authenticate servers
- D. Prevent SQL Injection

**Answer:** A ✅

---

### **29. Web Application Firewall (WAF)**

**Question:** A WAF primarily protects against:
- A. Web attacks like XSS, SQL Injection, CSRF
- B. MITM attacks
- C. DNS spoofing
- D. DDoS only

**Answer:** A ✅

---

### **30. Logging and Monitoring**

**Question:** Why is logging and monitoring important for web security?
- A. Detect suspicious activity and potential breaches
- B. Encrypt all user data
- C. Prevent XSS attacks automatically
- D. Replace HTTPS

**Answer:** A ✅

---