import mongoose from 'mongoose';

const subscriptionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription name is required'],
        trim:true,
        minlength:2,
        maxlength:100,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:0,
    },
    currencey:{
        type:String,
        enum:['USD','EUR','GBP','JPY','INR'],
        default:'USD',
    },
    frequency:{
        type:String,
        enum:['monthly','yearly','weekly','daily'],
        default:'monthly',
    },
    category:{
        type:String,
        enum:['entertainment','education','productivity','health','other'],
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:['active','expired','canceled'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(),
            message:'Start date cannot be in the future',
        }

    },
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator: function(value){
                return value > this.startDate;
            },
            message:'Renewal date must be after start date',
        

        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    }

}, {timestamps:true});


subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);


    }

    if(this.renewalDate< new Date()){\
        this.status='expired';
    }

    next();

});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
