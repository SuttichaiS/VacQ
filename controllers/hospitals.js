const Hospital = require('../models/Hospital');

//@desc Get all hospitals
//@route GET /api/v1/hospitals
//@access Public
// exports.getHospitals = (req,res,next) => {
//     res.status(200).json({success:true, msg:'Get all hospitals'});
// }
exports.getHospitals = async (req,res,next) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({
            success:true,
            count: hospitals.length,
            data:hospitals
        });
    } catch (err) {
        res.status(400).json({
            success:false
        });
    }
}

//@desc Get single hospital
//@route GET /api/v1/hospitals/:id
//@access Public
// exports.getHospital = (req,res,next) => {
//     res.status(200).json({success:true, msg:`Get hospital ${req.params.id}`});
// }
exports.getHospital = async (req,res,next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital) {
            // console.log(hospital)
            return res.status(400).json({success:false});
        }

        res.status(200).json({success: true, data: hospital});
    } catch(err){
        // console.log(err)
        res.status(400).json({success: false });
    }
}

//@desc Create a hospital
//@route POST /api/v1/hospitals
//@access Private
// exports.createHospital = (req,res,next) => {
//     console.log(req.body);
//     res.status(200).json({success:true, msg:'Create new hospitals'});
// }
exports.createHospital = async (req,res,next) => {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
        success: true,
        data:hospital
    })
}

//@desc Update single hospital
//@route PUT /api/v1/hospitals/:id
//@access Private
exports.updateHospital = async (req,res,next) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!hospital) {
            // console.log(`error hospital: ${hospital}`)
            return res.status(400).json({success: false});}
        res.status(200).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        // console.log(err)
        return res.status(400).json({success: false});
    }
    
}

//@desc Delete single hospital
//@route DELETE /api/v1/hospitals/:id
//@access Private
exports.deleteHospital = async (req,res,next) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);

        if(!hospital){
            return res.status(400).json({
                success:false,
                msg: 'Hospital Not Found!'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch(err) {
        return res.status(400).json({success: false});
    }
}