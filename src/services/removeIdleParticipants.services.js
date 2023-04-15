import dayjs from "dayjs";
import participantsRepositories from "../repositories/participants.repositories.js";

async function removeIdleParticipants() {
  const currentTimestamp = Date.now();
  const maxIdleDurationMs = 10000;
  const minTimeAllowed = currentTimestamp - maxIdleDurationMs;
  const currentTimeFormated = dayjs(currentTimestamp).format("HH:mm:ss");
  const query = { lastStatus: { $lt: minTimeAllowed } };

  const idleParticipants = await participantsRepositories.findByStatus(query);

  console.log(idleParticipants);

  const message = idleParticipants.map((participant) => ({
    from: participant.name,
    to: "Todos",
    text: "sai da sala...",
    type: "status",
    time: currentTimeFormated,
  }));

  console.log(message);

  //STOPED HERE

  // {from: 'xxx', to: 'Todos', text: 'sai da sala...', type: 'status', time: 'HH:MM:SS'}

  // [
  //     {
  //       _id: new ObjectId("643857f3eca3c1724473b1be"),
  //       name: 'oi',
  //       lastStatus: 1681414131709
  //     },
  //     {
  //       _id: new ObjectId("643876f7b5e4af5c67553409"),
  //       name: 'Gabriel Medina',
  //       lastStatus: 1681488637281
  //     },
  //     {
  //       _id: new ObjectId("64387ed055397c2aab26388e"),
  //       name: 'Taj Burrow',
  //       lastStatus: 1681424080146
  //     }
  //   ]
}

export default removeIdleParticipants;
