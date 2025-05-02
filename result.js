
export default function Result() {
  const cups = ["A", "B", "C", "D", "E", "F", "G"];
  const cup = cups[Math.floor(Math.random() * cups.length)];
  const beauty = Math.floor(Math.random() * 101);
  const growth = cups[Math.floor(Math.random() * cups.length)];

  return (
    <div style={{ textAlign: "center", background: "#000", color: "#fff", padding: "2rem" }}>
      <h1>診断結果</h1>
      <p>あなたは {cup} カップでした</p>
      <p>あなたは綺麗度 {beauty} でした</p>
      <p>あなたはこれから {growth} カップまで成長するでしょう</p>
    </div>
  );
}
