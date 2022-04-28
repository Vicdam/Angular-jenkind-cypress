pipeline{

    agent any

    tools {nodejs "node"}

    parameters{
        string(name: "SPEC", defaultValue: "cypress/integration/**/**", description: "Enter the script path that you want to execute")
        choice(name: "BROWSER", choices:['chrome', 'edge', 'firefox'], description:"choose the browser where you want to execute your script")
    }
    
    stages{
        stage('Installing Dependencies'){
            steps{
                sh "npm i"
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
};
