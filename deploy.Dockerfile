FROM openjdk:8-jdk-alpine
#FROM jenkins/jnlp-slave:alpine

ENV TERRAFORM_VERSION=0.12.8

USER root


# We add docker CLI (the deamon is not started, so you have to map -v '/var/run/docker.sock:/var/run/docker.sock')
RUN apk update && \
  apk add git docker curl py-pip gettext coreutils mariadb-client openssh-client sshpass jq maven zip openssl && \
  cd /tmp && \
  wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip --no-check-certificate && \
  unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/bin


RUN wget -O kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl

RUN wget -O aws-iam-authenticator  https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/linux/amd64/aws-iam-authenticator
RUN chmod +x ./aws-iam-authenticator
RUN mv ./aws-iam-authenticator /usr/local/bin/aws-iam-authenticator

#RUN wget -O https://storage.googleapis.com/kubernetes-helm/helm-v2.14.0-linux-amd64.tar.gz
#RUN tar zxvf helm-v2.14.0-linux-amd64.tar.gz
#RUN mv linux-amd64/helm /usr/local/bin/helm
#RUN mv linux-amd64/tiller /usr/local/bin/tiller
#RUN chmod a+x /usr/local/bin/helm /usr/local/bin/tiller


RUN pip install boto boto3 botocore awscli --upgrade

RUN addgroup -g 994	dockerbis
RUN adduser -D -u 1009 jenkins
RUN adduser jenkins dockerbis


