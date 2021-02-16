resource "aws_s3_bucket" "ev-dashboard-pwa-prod" {
  bucket = "ev-dashboard-pwa-prod"
}

resource "aws_ssm_parameter" "ev-dashboard-secret-key" {
  name  = "ev-dashboard-secret-key"
  type  = "SecureString"
  value = var.ev-dashboard-secret-key
}

resource "aws_cloudfront_distribution" "ev-dashboard-ssl" {
  origin {
    domain_name = "ev-dashboard-pwa-prod.s3.eu-west-2.amazonaws.com"
    origin_id = "S3-ev-dashboard-pwa-prod"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/E1Y7XCV9IBRHPJ"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = "S3-ev-dashboard-pwa-prod"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_dynamodb_table" "ev-dashboard-cache" {
  name = "vehicles"
  hash_key = "id"
  range_key = "created"
  read_capacity = 5
  write_capacity = 5

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "created"
    type = "N"
  }
}