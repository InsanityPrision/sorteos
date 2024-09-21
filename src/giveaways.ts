import { userInfo } from "node:os";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const userInfo = programData.users.find(
    (userInformation) =>
      userInformation?.email === email && userInformation.password === password
  );

  if (userInfo?.email !== email || userInfo.password !== password) {
    console.log("Usuario no registrado o credenciales incorrectas"),
      process.exit();
  }
  programData.userEmail = userInfo!.email;
  programData.isAdmin = userInfo!.isAdmin;

  saveData();

  console.log(`Bienvenido ${userInfo.name}`);
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

export const listGiveaways = (): void => {
  let songCount = 0;
  for (let count = 0; count <= programData.giveaways.length; count++) {
    songCount = count;
  }
  if (programData.giveaways.length === 0) {
    console.log("No hay ningún sorteo activo");
  } else if (programData.giveaways.length >= 1) {
    console.log(`Estos son los ${
      programData.giveaways.length
    } sorteos disponibles: \n 
    
    ${programData.giveaways.forEach((giveaway) => {
      console.log(
        `${songCount}Sorteo de ${giveaway.name} en ${giveaway.socialNetwork}`
      );
    })}`);
  }
};
