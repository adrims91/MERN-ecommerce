import User from '../models/authModels.js'

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password){
        return res.status(400).json({message: 'Faltan datos obligatorios'})
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está siendo utilizado" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "El email ya está siendo utilizado" });
    }

    const newUser = new User({
        username,
        email,
        password
    });
    await newUser.save();
    res.status(201).json({message: `Nombre de usuario ${username} y email ${email} creado correctamente`})
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ha ocurrido un error en el registro",
        details: error.message,
      });
  }
};

export { register };
