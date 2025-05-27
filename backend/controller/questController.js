import supabase from "../model/userdb.js";

export const getQuests = async (req, res) => {
  const userId = req.user?.id;
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .eq("userid", userId);

  if (error) return res.status(500).json({ error: "Failed to fetch quests" });
  res.status(200).json(data);
};

export const claimQuest = async (req, res) => {
  const userId = req.user?.id;
  const { quest_name } = req.body;

  const { error } = await supabase
    .from("quests")
    .update({ claimed: true })
    .eq("userid", userId)
    .eq("quest_name", quest_name);

  if (error) return res.status(500).json({ error: "Failed to claim quest" });
  res.status(200).json({ message: "Quest claimed" });
};
