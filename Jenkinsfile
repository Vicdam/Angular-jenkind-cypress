pipeline{

    agent {
    docker { image 'cypress/base:latest'}
  }

    tools {nodejs "node"}

    parameters{
        string(name: "SPEC", defaultValue: "cypress/integration/**/**", description: "Enter the script path that you want to execute")
        choice(name: "BROWSER", choices:['chrome', 'edge', 'firefox'], description:"choose the browser where you want to execute your script")
    }
    
    stages{
        stage('Install dependencies'){
            steps{
               sh 'npm i'
               sh 'npm install cypress --save-dev'
            }
        }
        stage('Building'){
            steps{
               sh 'npm run build'
            }
        }
        stage('Testing'){
            steps{
                sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploying'){
            steps{
                echo "Deploy the Application"
            }
        }
    }
    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/reports', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
};
