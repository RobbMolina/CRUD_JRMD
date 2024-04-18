import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from  "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen('Hello ISND'));

let playerName;

const sleep = (ms = 2000)=>  new Promise((r) => setTimeout(r,ms));

async function welcome (){
    const rainbowTitle = chalkAnimation.glitch(
        'How well do you know me? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer
    if you get any question wrong i will be ${chalk.bgRed('KILLED')}
    So get all the questions right...
    `);
}
async function askName(){
    const answer = await inquirer.prompt({

        name: 'Player_name',
        type: 'input',
        message: 'whats is your name',
        default(){
            return 'Player';
        },
    });
    playerName=answer.playerName;
}
async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect){
        spinner.success({text:`Nice work ${playerName}.That's a legit answer`});
    }else{
        spinner.error( { text:`💀💀💀 Game over, you lose ${playerName}!` });
        process.exit()
    }
}
async function question1(){
    const answers = await inquirer.prompt({
      name: 'question1',
      type: 'list',
      message: 'What is the first videogame I ever played?',
      choices: [
        'Call of Duty Modern Warfare 2',
        'Halo reach',
        'Minecraft',
        'Geometry dash',
      ]
    });
    return handleAnswer(answers.question1 ==='Minecraft');
  }
  async function question2(){
    const answers = await inquirer.prompt({
      name: 'question2',
      type: 'list',
      message: 'What my favorite movie?',
      choices: [
        'about time',
        'avengers',
        'ironman',
        'batman',
      ]
    });
    return handleAnswer(answers.question2 === 'about time');
  }
async function question3(){
    const answers = await inquirer.prompt({
      name: 'question3',
      type: 'list',
      message: 'Who is my fav artist?',
      choices: [
        'kendrick lamar',
        'sza',
        'drake',
        'post malone',
      ]
    });
    return handleAnswer(answers.question3 === 'post malone');
  }
  async function question4(){
    const answers = await inquirer.prompt({
      name: 'question4',
      type: 'list',
      message: 'my favorite food?',
      choices: [
        'pizza',
        'burguers',
        'quesabirrias',
        'sandwich',
      ]
    });
    return handleAnswer(answers.question4 === 'burguers');
  }

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
winner();