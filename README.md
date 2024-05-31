# Move Monsters

Move Monsters is an interactive platform for learning Move and Sui programming through hands-on lessons and exercises. It leverages the Sui blockchain to mint non-transferable NFTs as verifiable credentials for lesson completion, providing an engaging and rewarding educational experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the App](#running-the-app)
  - [Adding Lessons](#adding-lessons)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

Move Monsters offers an engaging way to understand and apply the concepts of the Move programming language and the Sui blockchain. Through interactive lessons written in Markdown, users can learn by doing and earn verifiable NFTs upon successful completion of each lesson.

## Features

- **Interactive Learning:** Hands-on lessons with real-time feedback.
- **NFT Credentials:** Mint non-transferable NFTs to verify proficiency.
- **Gamified Experience:** Motivating learning process with rewards.
- **Comprehensive Curriculum:** Covers basics to advanced topics in Move and Sui.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/)
- A Sui wallet and testnet account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pedrocruzio/move-monsters.git
   cd move-monsters
    ```
2. Install dependencies:
    ```sh
    yarn install
    ```
### Usage

#### Running the App
Start the development server:

```sh
yarn dev
```

Navigate to http://localhost:3000 in your browser to see the app in action.

#### Adding Lessons

Lessons are written in Markdown and stored in the lessons directory. Each lesson follows this format:

```
---
title: "Lesson Title"
description: "Brief description of the lesson."
initial_code: |
  // Starter code here
correct_code: |
  // Correct solution code here
expected_output: "Expected output"
---

# Lesson Title

Content of the lesson goes here.

## Code Exercise

Instructions for the exercise.

// Exercise code block
```

### Move Monster Sui Module

To run the Sui part of the project, follow these steps:

1. Navigate to the `move_monsters_module` directory:
    ```sh
    cd move_monsters_module
    ```

2. Build the Move modules:
    ```sh
    sui move build
    ```

3. Publish the Move modules to the Sui testnet:
    ```sh
    sui client publish --gas-budget 1000000
    ```

For more details on using the Sui CLI, refer to the [Sui documentation](https://docs.sui.io/).


### Contributing
Contributions are welcome! Please read our contributing guidelines for more information.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements
- Sui Foundation
- Mysten Labs
