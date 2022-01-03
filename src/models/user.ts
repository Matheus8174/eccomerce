import { model, Schema } from 'mongoose';
import { hash } from 'bcrypt';

type UserDocument = {
  name: string;
  email: string;
  password: string;
  about: string;
  role: number;
  history?: Array<any>;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    about: {
      type: String,
      trim: true
    },

    role: {
      type: Number,
      default: 0,
      max: 1
    },

    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>('save', async function(next) {
  this.password = await hash(this.password, 10);

  next();
});

const User = model('users', UserSchema);

export default User;