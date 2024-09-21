import { userInfo } from "node:os";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const findAdmin = programData.users.find((userAdmin) => userAdmin.isAdmin);
  const findName = programData.users.find((userName) => userName.name);
  const findEmail = programData.users.find((userEmail) => userEmail.email);
  const isSameEmail = findEmail?.email === email;
  const findPassword = programData.users.find(
    (userPassword) => userPassword.password
  );
  const isSamePassword = findPassword?.password === password;

  if (isSameEmail === false || isSamePassword === false) {
    console.log("Usuario no registrado o credenciales incorrectas");
    process.exit();
  }

  programData.userEmail = findEmail!.email;
  programData.isAdmin = findAdmin!.isAdmin;

  saveData();

  console.log(`Bienvenido ${findName!.name}`);
};

export const createGiveaway = (): void => {
  const newGiveawayNameAndSocial = askUserNewGiveawayData();
  const newGiveawayParticipants: Giveaway = {
    name: "",
    socialNetwork: "",
    participants: [],
  };
  const newGiveaway = Object.assign(
    newGiveawayParticipants,
    newGiveawayNameAndSocial
  );
  programData.giveaways.push(newGiveaway);

  saveData();

  console.log("Sorteo creado");
};
