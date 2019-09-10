function findProfileById(id) {
    return User
      .findById(id)
      .then(dbRes => dbRes)
      .catch(err => console.log(err));
  }

router.get ("/profile-edit/:id", (req, res) => {
    const photo = findProfileById(req.params.id)

}