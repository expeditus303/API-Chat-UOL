async function update(user) {
    const participantExists = await statusRepositories.findByName({ name: user})

    if (!participantExists) throw 
}