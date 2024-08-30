import Category from "./category.enum";

const CategoryKeywords: Record<Category, string[]> = {
  // Directions
  [Category.Agile]: ["agile", "agility", "scrum", "kanban", "lean", "agile manifesto", "product management", "product owner", "scrum master", "agile coach", "agile transformation", "project management"],
  [Category.Architecture]: ["architecture", "microservices", "monolith", "serverless", "event-driven", "event sourcing", "cqrs", "cto", "architect"],
  [Category.Design]: ["design", "ui", "ux", "user interface", "user experience", "figma", "sketch", "adobe xd"],
  [Category.DevOps]: ["devops", "docker", "kubernetes", "jenkins", "continuous integration", "continuous deployment", "cybersecurity / infosec", "sre"],
  [Category.Embedded]: ["embedded", "arduino", "raspberry pi", "iot", "internet of things", "hardware"],
  [Category.Mobile]: ["mobile", "android", "ios", "swift", "kotlin", "react native", "flutter"],
  [Category.Testing]: ["testing", "unit testing", "integration testing", "automated testing", "test-driven development"],

  // Languages
  [Category.Java]: ["java", "spring", "spring boot", "java ee", "java se"],
  [Category.JavaScript]: ["javascript", "js", "typescript", "node", "nodejs", "react", "angular", "vue", "typescript"],
  [Category.DotNet]: ["dotnet", "c#", "asp.net", "dotnet core", "dotnet framework"],

  // Technologies
  [Category.AI]: ["ai", "ai / ml", "artificial intelligence", "chatgpt", "deep learning", "machine learning", "neural network", "nlp", "reinforcement learning", "tensorflow"],
  [Category.Database]: ["database", "sql", "mysql", "mongodb", "postgresql", "nosql", "sqlite", "postgres"],
  [Category.Cloud]: ["cloud", "aws", "azure", "gcp", "google cloud", "amazon web services", "cloud computing"],

  // Default
  [Category.Unknown]: []
};

export default CategoryKeywords;
