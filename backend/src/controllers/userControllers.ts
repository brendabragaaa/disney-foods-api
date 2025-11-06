import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(user);

    return res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ error: "Senha inválida" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

  return res.json({ token });
};
