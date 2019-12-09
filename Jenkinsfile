/**
 * Docker command helper
 * > .runWith:
 * docker.image('image name').runWith('docker option', 'run argument') { c->
 *	Here command are executed on agent not in container (use inside() for that) 
 *	but the container is still running until the end of this closure
 * }
 * 
 * > .inside:
 * docker.image('image name').inside('docker option') { c->
 *	Here command are executed in container
 * 
 * 
 * Doc Pipeline Docker: https://jenkins.io/doc/pipeline/steps/docker-workflow/#code-withdockerserver-code-sets-up-docker-server-endpoint
 * Doc Pipeline Syntax: https://opensource.triology.de/jenkins/pipeline-syntax/html  
 */
pipeline { 
  agent any

	options {
		//skipDefaultCheckout false
		disableConcurrentBuilds()
		buildDiscarder(logRotator(numToKeepStr:"50"))
		timeout(time: 600, unit: "MINUTES")
		retry(0)
	}

	parameters {
	 	choice( name: 'Environment',
						choices: ['NonProd', 'Production'],
						description: 'Name of the AWS environment')
	}

	environment {
		AWS_ACCOUNT 			= "${params.Environment != 'Production' ? 'smartereff-non-prod-aws-pw' : 'smartereff-aws-prod-usr-psw'}"
		TF_VAR_DNS_ZONE 	= "${params.Environment != 'Production' ? 'dispatchplus-nonprod.navblue.cloud' : 'dispatchplus.navblue.cloud'}"

		INFRA_FOLDER    = 'Infrastructure'
		HOSTED_ZONE     = "${INFRA_FOLDER}/terraform/hosted-zone"
	}

	stages {

		stage ("Init") {
			steps {
				script {
					// reinit workspace
					sh "pwd"
					sh 'git clean -dfx'
					sh "id"

				}
			}
		} // END STAGE INIT

		stage ('Create Hosted zone') {
			steps {
				script {
					echo "AWS_ACCOUNT: ${AWS_ACCOUNT}"
					echo "TF_VAR_DNS_ZONE: ${TF_VAR_DNS_ZONE}"

					echo "Create Hosted zone ..........."
					// docker.build("deploy-dispatchplus:deploy-dispatchplus-hosted", "-f deploy.Dockerfile --rm ${WORKSPACE}")
					// .inside("--net=host --user jenkins:dockerbis -v /var/run/docker.sock:/var/run/docker.sock") { c->
          //   //Create AWS route53 HostedZone => for prod environment (one-shot)
					// 	echo "****************Create AWS route53 HostedZone => for environment*********************"
          //   sh "cd ${HOSTED_ZONE} && terraform init && terraform plan -no-color && terraform apply -auto-approve"
					// }
				}
			}
		} // END STAGE CREATE HOSTED ZONE

	} // END STAGES
} // END PIPELINE
