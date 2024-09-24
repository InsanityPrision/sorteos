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
  let giveawayCount = 1;

  if (programData.giveaways.length === 0) {
    console.log("No hay ningún sorteo activo");
  } else if (programData.giveaways.length >= 1) {
    programData.giveaways.forEach(
      (giveaway) =>
        console.log(
          `${giveawayCount++} Sorteo de un ${giveaway.name} en ${
            giveaway.socialNetwork
          }`
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

export const enterGiveaway = (enterPosition: number): void => {
  let participantNumber = 0;
  for (let position = 0; position < programData.users.length; position++) {
    if (programData.userEmail === programData.users[position].email) {
      participantNumber = position;
    }
  }
  if (enterPosition <= programData.giveaways.length) {
    programData.giveaways[enterPosition - 1].participants.push(
      programData.users[participantNumber]
    ),
      saveData();
    console.log("Te has inscrito en el sorteo! SUERTE!");
  } else if (enterPosition > programData.giveaways.length) {
    console.log("El sorteo no existe, prueba otra vez!");
  }
};

export const listUserGiveaways = (): void => {
  for (
    let giveawayRunner = 0;
    giveawayRunner < programData.giveaways.length;
    giveawayRunner++
  ) {
    if (programData.giveaways[giveawayRunner].participants.length > 1) {
      console.log(
        `Estas participando en ${programData.giveaways[giveawayRunner].participants.length} sorteos`
      );
      for (
        let giveawayPosition = 0;
        giveawayPosition < programData.giveaways.length;
        giveawayPosition++
      ) {
        for (
          let positionUser = 0;
          positionUser <
          programData.giveaways[giveawayPosition].participants.length;
          positionUser++
        ) {
          if (
            programData.userEmail ===
            programData.giveaways[giveawayPosition].participants[positionUser]
              .email
          ) {
            console.log(
              `${giveawayPosition + 1} Sorteo de ${
                programData.giveaways[giveawayPosition].name
              } en ${programData.giveaways[giveawayPosition].socialNetwork}`
            );
          }
        }
      }
      break;
    } else console.log("No estas participando en ningún sorteo");
  }
};
