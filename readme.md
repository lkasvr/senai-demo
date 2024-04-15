# Hackathon Project: SenaiLabIntegration

## Overview

Welcome to the GitHub repository for our project developed during the 20-hour InovaTI HACKATHON. This project aims to integrate a local Quality Assurance & Quality Control laboratory testing machine into the lab's digital system.

## The Challenge

During the Hackathon, participants were tasked with creating innovative solutions for real problems local companies have. Our team focused on solving the data integrity problem of a Laboratory testing result. Senai, a QA/QC lab, tests construction materials such as concrete to ensure their quality. After testing the material, a lab technician has to read the result value on the machine's display and manually record the result in their system, which is error-prone.

## Our Solution

The **lab-integration** tracks a material testing machine's test result and automates a form submission for a new result on the lab's website. We wanted to write directly on the database, but the lab's IT department refused access. As we didn't know the database schema, we had to build a macro to fill the form on the lab's website, which the lab technician let us skim through.

The **mock-testing-environment** mocks the lab's environment: running a test and recording the test result.
Because the testing machine updates a JSON file in its local system once a test is completed, we imitate the same behavior to update a JSON file with a random result.
Once a result is displayed on the machine, a technician must record it on the website. We created a fake website with a form with the same structure to demonstrate our macro.

### Technologies Used

- **Node.js**: A script automatically fills a form with a new test result on a website when a test results JSON file is updated.
- **Next.js**: A website with two functionalities: updating a test result JSON file with a random value and a simple form to submit a new test result.

## Team

- **John Park** - Developer
- **Lucas Vieira** - Developer

## Setup

To get a local copy up and running, follow these simple steps:

1. Clone the repository:

```bash
git clone https://github.com/lkasvr/senai-demo.git
```

### mock-testing-environment

2. Install NPM packages:

```bash
cd mock-testing-environment
npm install
```

3. Start the development server:

```bash
npm run dev
```

### lab-integration

2. Install NPM packages:

```bash
cd mock-testing-environment
npm install
```

3. Run the script in the development mode:

- Please expect a browser to pop up as the script runs because we want to demo how the macro works, but it is only for demonstration purposes.

```bash
npm run dev
```

Thank you for visiting our project!
