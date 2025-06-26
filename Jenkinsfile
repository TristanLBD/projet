pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'simple-js-project'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        GITHUB_PACKAGE = 'ghcr.io'
        GITHUB_USERNAME = 'tristanlbd'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Téléchargement du repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances...'
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install --verbose'
            }
        }

        stage('Build') {
            steps {
                echo 'Compilation du projet...'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Exécution des tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Création de l\'image Docker...'
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Tag Repository') {
            steps {
                echo 'Tag du repository avec la version du build...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        bat """
                            git config user.email "lbdtristan@gmail.com"
                            git config user.name "TristanLBD"
                            git tag -a "v${DOCKER_TAG}" -m "Build ${DOCKER_TAG} - TypeScript avec interface web"
                            git remote set-url origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/projet.git
                            git push origin "v${DOCKER_TAG}"
                        """
                    }
                }
            }
        }

        stage('Push to GitHub Container Registry') {
            steps {
                echo 'Déploiement de l\'image Docker sur GitHub Container Registry...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        bat """
                            echo ${GITHUB_TOKEN} | docker login ${GITHUB_PACKAGE} -u ${GITHUB_USER} --password-stdin
                            docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${GITHUB_PACKAGE}/${GITHUB_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${GITHUB_PACKAGE}/${GITHUB_USERNAME}/${DOCKER_IMAGE}:latest
                            docker push ${GITHUB_PACKAGE}/${GITHUB_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${GITHUB_PACKAGE}/${GITHUB_USERNAME}/${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Nettoyage...'
            bat 'docker system prune -f'
        }
        success {
            echo 'Pipeline terminée avec succès!'
        }
        failure {
            echo 'Pipeline échouée!'
        }
    }
}
