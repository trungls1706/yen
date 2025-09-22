# AWS DVA Exam – CloudFront, ECS, EKS, Batch

---

## 🌍 CloudFront

### Use Case
- **Website & API acceleration**: cache HTML, CSS, JS, hình ảnh → phân phối nhanh toàn cầu.  
- **Media streaming**: video/audio latency thấp.  
- **Security**: tích hợp WAF & Shield chống DDoS.  
- **Private content**: signed URL/cookie.  
- **Global application**: giảm tải backend (EC2, ALB, S3).  

### CloudFront vs S3
| Đặc điểm       | CloudFront (CDN) | S3 (Object Storage) |
|----------------|------------------|---------------------|
| **Mục đích**   | CDN phân phối nội dung | Lưu trữ dữ liệu |
| **Hiệu năng**  | Cache tại Edge Location, giảm latency | Luôn đọc từ region bucket |
| **Chi phí**    | Request + Data Transfer Out (thường rẻ hơn direct S3) | GET/PUT + Data Transfer Out |
| **Geo-Location** | Có restriction theo quốc gia | Không hỗ trợ trực tiếp |
| **Kết hợp**    | Đứng trước S3, ALB, API Gateway | Backend lưu trữ |

### Key Features
- **Cache**: TTL, cache policy, Lambda@Edge để customize.  
- **Pricing**: pay-as-you-go, global rẻ hơn direct S3.  
- **Geo restriction**: chặn/quản lý quốc gia.  
- **ALB integration**: giảm latency & bảo mật.  

### Exam Tips
- 🔑 Keywords: *low latency*, *reduce S3 cost*, *geo restriction*, *private content*, *secure content*.  
- ❓ Sample Q&A:
  - User global tải chậm? → **CloudFront cache edge location**.  
  - Giới hạn video chỉ ở VN? → **Geo Restriction**.  
  - Giảm chi phí truy xuất S3? → **CloudFront trước S3**.  

---

## 🐳 ECS (Elastic Container Service)

### Use Case
- **Microservices**: deploy nhiều service độc lập (auth, payment, product).  
- **Batch Job**: job định kỳ (ETL, nightly reports).  
- **Event-driven Task**: trigger bởi S3/SQS/EventBridge (vd: resize ảnh).  
- **Fargate (serverless)**: không cần quản lý EC2.  
- **Rolling update**: ECS Service update dần dần (zero downtime).  

### ECS Concepts
- **Task**: đơn vị chạy container (Task Definition: image, CPU, RAM, env).  
- **Launch Type**:
  - **EC2**: tự quản lý cluster EC2.  
  - **Fargate**: serverless.  
- **Service**: quản lý số lượng task, load balancing, scaling.  
- **Agent**: chạy trên EC2, giao tiếp ECS control plane.  
- **Load Balancer**: ALB/NLB phân phối request.  
- **Rolling updates**: update không downtime.  

### Exam Tips
- 🔑 Keywords: *containerized app*, *serverless container*, *batch processing*, *rolling update*.  
- ❓ Sample Q&A:
  - Backend container, không muốn quản lý EC2? → **Fargate**.  
  - Job phân tích dữ liệu hằng đêm? → **ECS Task / AWS Batch**.  
  - Zero downtime deploy? → **ECS Service + Rolling update**.  
  - ECS Agent ở đâu? → **EC2 instance**.  

---

## ☸️ EKS (Elastic Kubernetes Service)

### Là gì?
- Managed Kubernetes service trên AWS.  
- AWS quản lý control plane, bạn quản lý worker nodes (EC2 hoặc Fargate).  

### Use Case
- **Microservices phức tạp**: cần Helm, Istio, Prometheus.  
- **Hybrid cloud**: workload chạy on-prem + cloud.  
- **Machine Learning**: TensorFlow/Kubeflow pipeline.  
- **Multi-tenant SaaS**: chia namespace cho khách hàng.  
- **High availability**: HPA + Cluster Autoscaler.  

### Thành phần chính
- **Cluster**: control plane + worker nodes.  
- **Node group**: nhóm EC2/Fargate nodes.  
- **Pod**: đơn vị deploy (chạy container).  
- **Deployment**: scale & rolling update pod.  
- **Service**: expose pod (ClusterIP, NodePort, LoadBalancer).  
- **Ingress**: định tuyến HTTP/HTTPS qua ALB/NLB.  

### Tích hợp AWS
- **IAM Roles for Service Accounts (IRSA)**: IAM role cho pod.  
- **Load Balancer Controller**: ALB/NLB integration.  
- **CloudWatch / X-Ray / Prometheus**: monitoring.  
- **ECR**: container registry.  

### Exam Tips
- 🔑 Keywords: *Kubernetes ecosystem*, *portability*, *IRSA*, *Ingress controller*, *HPA*, *Cluster Autoscaler*.  
- ❓ Sample Q&A:
  - Dùng Helm/Istio? → **EKS**.  
  - Gán IAM role cho pod? → **IRSA**.  
  - Auto-scale pod khi CPU > 70%? → **HPA**.  
  - Scale worker node khi thiếu tài nguyên? → **Cluster Autoscaler**.  
  - Workload chạy cả on-prem lẫn AWS? → **EKS**.  

---

## ⚙️ Batch Job

### Là gì?
- Job chạy 1 lần hoặc theo lịch (không 24/7).  
- Ví dụ: ETL, data processing, nightly reports.  
- AWS Batch có thể chạy trên ECS/EC2 Spot.  

---

## 📌 Tóm tắt tips chọn dịch vụ
- **CloudFront** → CDN, latency thấp, geo restriction, signed URL.  
- **ECS (Fargate)** → đơn giản, serverless container.  
- **ECS (EC2)** → khi muốn tự quản lý cluster.  
- **EKS** → Kubernetes ecosystem, hybrid cloud, complex microservices.  
- **Batch job** → ECS Task hoặc AWS Batch.  
