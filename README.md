# Steps to reproduce
1. `cd service-1`
2. `tsc`
3. gcloud builds submit . --tag gcr.io/{gcp-project-id}/helloworld
4. gcloud run deploy helloworld --image gcr.io/{gcp-project-id}/helloworld --platform managed --region us-east1 --allow-unauthenticated