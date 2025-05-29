// controllers/init_Replicas.js
// -----------------------------

const cfg = {
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27217" },
    { _id: 1, host: "localhost:27218" },
    { _id: 2, host: "localhost:27219", arbiterOnly: true }
  ]
};

try {
  const status = rs.status();
  if (!status.members || status.members.length === 0) {
    print("📢 Initiating replica set…");
    rs.initiate(cfg);
  } else {
    print("ℹ️ Replica set already exists, skipping initiate.");
  }
} catch (e) {
  print("⚠️ rs.status() failed—running rs.initiate():", e);
  rs.initiate(cfg);
}

// Optional: bump priority on the primary
cfg.members[0].priority = 2;
print("🔧 Applying reconfiguration…");
rs.reconfig(cfg, { force: true });

print("✅ Replica set is now:");
printjson(rs.status());
