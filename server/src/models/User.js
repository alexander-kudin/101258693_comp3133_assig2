import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: [true, 'Username required'],
            unique: true, 
        },
        firstname: { 
            type: String, 
            required: [true, 'User First Name required'],
        },
        lastname: { 
            type: String, 
            required: [true, 'User Last Name required'],
        },
        password: { 
            type: String, 
            required: [true, 'Password required'],
            min: [6, 'Password must be at least 6 characters, got {VALUE}'],
            validate: {
                validator: function(v) {
                  return /^[\w\d_#$&]{6,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password`
            },
        },
        email: { 
            type: String, 
            required: [true, 'Email required'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function(v) {
                  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email`
            },
        },
        type: { 
            type: String, 
            required: [true, 'User Type required'],
            enum: {
                values: ['customer', 'admin'],
                message: '{VALUE} type is not supported user type'
            }
        },
    },
);

const User = mongoose.model('user', UserSchema);

export default User;