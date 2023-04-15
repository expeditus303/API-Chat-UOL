import dayjs from "dayjs";
import participantsRepositories from "../repositories/participants.repositories.js";
import messagesRepositories from "../repositories/messages.repositories.js";

async function removeIdleParticipants() {
  const currentTimestamp = Date.now();
  const maxIdleDurationMs = 10000;
  const minTimeAllowed = currentTimestamp - maxIdleDurationMs;
  const currentTimeFormated = dayjs(currentTimestamp).format("HH:mm:ss");
  const filter = { lastStatus: { $lt: minTimeAllowed } };
  console.log("Checking for idle users...")
  const idleParticipants = await participantsRepositories.findIdle(filter);
  
  if (idleParticipants.length > 0) {
    await participantsRepositories.deleteIdle(filter);

    const messages = idleParticipants.map((participant) => ({
      from: participant.name,
      to: "Todos",
      text: "sai da sala...",
      type: "status",
      time: currentTimeFormated,
    }));

    await messagesRepositories.createMany(messages);
    console.log("Idle users have been removed")
  }
}

function removeIdleParticipantsInterval(milliseconds) {
  return setInterval(removeIdleParticipants, milliseconds)
}

export default removeIdleParticipantsInterval;
