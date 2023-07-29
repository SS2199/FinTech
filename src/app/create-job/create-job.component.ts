import { Component } from '@angular/core';
import { JenkinsService } from '../../services/jenkins.service';

@Component({
  selector: 'app-create-job',
  template: `
    <h1>Create New Jenkins Job</h1>
    <button (click)="createJob()">Create Job</button>
  `,
})
export class CreateJobComponent {
  constructor(private jenkinsService: JenkinsService) {}

  createJob() {
    const jobName = 'Jenkins'; // Replace 'Your_Job_Name' with the desired name for your Jenkins job
    const pipelineScript = `
      pipeline {
        agent any
        stages {
          stage('Hello') {
            steps {
              echo 'Hello, Jenkins!'
            }
          }
        }
      }
    `;

    this.jenkinsService.createPipelineJob(jobName, pipelineScript)
      .then((response) => {
        console.log('Job created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating job:', error);
      });
  }
}
