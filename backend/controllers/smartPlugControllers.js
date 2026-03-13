const SmartPlug = require("../models/SmartPlugs");
const mqttClient = require("../config/mqtt");

exports.getAllSmartPlugsByRoomId = async (req, res) => {
    console.log("getAllSmartPlugsByRoomId");
  try {
    const { roomId } = req.query;
    const smartPlugs = await SmartPlug.getAllSmartPlugsByRoomId(roomId);
    res.status(200).json({smartPlugs: smartPlugs.rows});
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve smart plugs" });
  }
};

exports.toggleSwitch = async (req, res) => {
    console.log("toggleSwitch");
    //console.log(req.body);
    try {   
        const { plugID } = req.body;
        console.log(plugID);
        const smartPlug = await SmartPlug.toggleSwitch(plugID);
        console.log("smartPlug",smartPlug);
        if(smartPlug){
            mqttClient.appClient.publish("smartplug/state", "1");  
        }else{
            mqttClient.appClient.publish("smartplug/state", "0");  
        }

        res.status(200).json({smartPlug: smartPlug.rows});
    } catch (error) {
        res.status(500).json({ error: "Failed to toggle switch" });
    }


}

exports.getEnergyConsumptionDay = async (req, res) => {
    console.log("getEnergyConsumptionDay");
    try {
        const { roomId } = req.query;
        const energyConsumption = await SmartPlug.getEnergyConsumptionDay(roomId);
        res.status(200).json({energyConsumption: energyConsumption.rows});
    } catch (error) {
        res.status(500).json({ error: "Failed to get energy consumption" });
    }
}

exports.getEnergyConsumptionWeekly = async (req, res) => {
    console.log("getEnergyConsumptionWeekly");
    try {
        const { roomId } = req.query;
        const energyConsumption = await SmartPlug.getEnergyConsumptionWeekly(roomId);
        res.status(200).json({energyConsumption: energyConsumption.rows});
    } catch (error) {
        res.status(500).json({ error: "Failed to get energy consumption" });
    }
}

exports.getHourlyEnergyConsumption = async (req, res) => {
    console.log("getHourlyEnergyConsumption");
    try {
        const { plugID } = req.query;
        const energyConsumption = await SmartPlug.getDummyHourlyEnergyConsumption(plugID);
        res.status(200).json({energyConsumption: energyConsumption.rows});
        
    } catch (error) {
        res.status(500).json({ error: "Failed to get energy consumption" });
    }
}

exports.addSmartPlug = async (req, res) => {
    try {
        const { deviceName, scannedID, roomId } = req.body;
        const smartPlug = await SmartPlug.register(deviceName, scannedID, roomId);
        
        // Check if the response is an empty array (device already exists)
        if (smartPlug.rows.length === 0) {
            return res.status(200).json({ message: "Smart plug already added in the system", smStatus: 0 });
        }
        
        res.status(200).json({ message: "Successfully added smart plug", smStatus: 1 });
    } catch (error) {
        res.status(500).json({ error: "Failed to add smart plug" });
    }
}

exports.deleteSmartPlug = async (req, res) => {
    console.log("deleteSmartPlug");
    try {
        const { plugID } = req.body;
        const smartPlug = await SmartPlug.deleteSmartPlug(plugID);
        res.status(200).json({message: "Successfully deleted smart plug"});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete smart plug" });
    }
}


exports.updateSMName = async (req, res) => {
    console.log("updateSMName");
    try {
        const { plugID, deviceName } = req.body;
        const smartPlug = await SmartPlug.updateSMName(plugID, deviceName);
        res.status(200).json({message: "Successfully updated smart plug name"});
    } catch (error) {
        res.status(500).json({ error: "Failed to update smart plug name" });
    }
}



