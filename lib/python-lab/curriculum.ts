import data from "./lessons.json";
import type { Lesson, LearningStyle } from "./types";

export const lessons: Lesson[] = data;
export const modules = [
  { title: "Your first lines", description: "Give an instruction. See it work.", level: "First steps" },
  { title: "Values & variables", description: "Keep information and calculate.", level: "First steps" },
  { title: "A conversation with code", description: "Ask, convert and format.", level: "First steps" },
  { title: "Make a decision", description: "Let a program choose a path.", level: "Foundations" },
  { title: "Repeat with a purpose", description: "Count, loop and find patterns.", level: "Foundations" },
  { title: "Words & lists", description: "Work with one item or many.", level: "Foundations" },
  { title: "Organise your data", description: "Choose a useful collection.", level: "Foundations" },
  { title: "Build reusable tools", description: "Functions make bigger ideas manageable.", level: "Build further" },
  { title: "Make it reliable", description: "Handle errors, test and save data.", level: "Build further" },
  { title: "Make it yours", description: "Objects and projects that fit together.", level: "Build further" },
];

export const learningStyles: { id: LearningStyle; title: string; ages: string; description: string }[] = [
  { id: "little", title: "Little steps", ages: "About 5–7 · with a helper", description: "Read together, use code pieces and take one small step at a time." },
  { id: "explorer", title: "Explorer", ages: "About 8–12", description: "Try a small challenge, make a prediction and collect learning milestones." },
  { id: "independent", title: "Independent", ages: "Teens & confident beginners", description: "Experiment, explain your reasoning and build your own projects." },
  { id: "everyday", title: "Everyday Python", ages: "Adults · any age", description: "Learn at your pace with useful examples and a calm workspace." },
];

export const starterProgram = '# This is your space. Try an idea.\nprint("Hello, Python!")\n\nfor number in range(1, 4):\n    print("Small step", number)\n';

export const playgroundExamples = [
  { title: "A fresh page", code: '# Write your Python here.\n', input: "" },
  { title: "Hello, Python", code: starterProgram, input: "" },
  { title: "Ask a question", code: 'name = input("What should I call you? ")\nprint(f"Hello, {name}!")\n', input: "Code explorer" },
  { title: "A small calculator", code: 'first = float(input("First number: "))\nsecond = float(input("Second number: "))\nprint("Total:", first + second)\n', input: "12\n8" },
  { title: "A word game", code: 'word = input("Choose a word: ")\nprint("Backwards:", word[::-1])\nprint("Letters:", len(word))\n', input: "python" },
  { title: "A useful function", code: 'def total_with_discount(price, percent):\n    return round(price * (1 - percent / 100), 2)\n\nprint(total_with_discount(500, 10))\n', input: "" },
];
