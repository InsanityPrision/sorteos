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
  const newGiveawayInfo = askUserNewGiveawayData();

  const newGiveaway: Giveaway = {
    name: newGiveawayInfo.giveawayName,
    socialNetwork: newGiveawayInfo.giveawaySocialNetwork,
    participants: [],
  };

  programData.giveaways.push(newGiveaway);

  saveData();

  console.log("Sorteo creado");
};

export const listGiveaways = (): void => {
  let giveawayCount = 0;
  for (let count = 0; count <= programData.giveaways.length; count++) {
    giveawayCount = count;
  }
  if (programData.giveaways.length === 0) {
    console.log("No hay ningún sorteo activo");
  } else if (programData.giveaways.length >= 1) {
    programData.giveaways.forEach(
      (giveaway) =>
        console.log(
          `${giveawayCount} Sorteo de un ${giveaway.name} en ${giveaway.socialNetwork}`
        ),
      console.log(
        `Éstos son los ${programData.giveaways.length} sorteos disponibles`
      ) +
        "\n" +
        "\n"
    );
  }
};

export const deleteGiveaway = (deletePosition: number): void => {
  if (deletePosition <= programData.giveaways.length) {
    programData.giveaways.splice(deletePosition - 1, 1);
    console.log("Sorteo eliminado");
  } else if (deletePosition > programData.giveaways.length) {
    console.log("Posicion incorrecta");
  }

  saveData();
};
