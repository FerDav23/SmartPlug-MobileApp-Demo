const { client, resetCount, getCount } = require("../config/mqtt");

exports.resetCount = async (req, res) => {
    try {
        resetCount(); // ✅ Call the function (not just reference it)
        res.json({ message: "Count has been reset to 0" });
    } catch (error) {
        console.error("❌ Error resetting count:", error.message);
        res.status(500).json({ error: "Failed to reset count" });
    }
};

exports.printCount = async (req, res) => {
    console.log("in get")
    try {
        var count = getCount(); // ✅ Get the current count
        res.json({ testCount: count });
    } catch (error) {
        console.error("❌ Error fetching count:", error.message);
        res.status(500).json({ error: "Failed to fetch count" });
    }
};
