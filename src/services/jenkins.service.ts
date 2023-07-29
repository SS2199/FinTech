import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class JenkinsService {
  private apiUrl = 'http://127.0.0.1:3000'; // Replace this with your Node.js server URL

  constructor() {}

  async createPipelineJob(jobName: string, pipelineScript: string) {
    const url = `${this.apiUrl}/createJob`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      jobName,
      pipelineScript,
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
