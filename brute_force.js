function quickestPath(portals) {
  let currBlock = 1;
  let currTurn = 0;

  const onwardsPortal = portals
    .filter((block) => block.location < block.destination)
    .sort((a, b) => a.location - b.location);

  console.log(onwardsPortal);

  let blockSearchId = 0;

  while (currBlock < 200) {
    currTurn++;

    let bestPosThisTurn = currBlock + 11;

    // อันนี้มาเลื่อน index ของ block ใหม่ที่เราตั้งใจจะเช็ค
    let tempSearchId = blockSearchId;

    while (
      // คือถ้าค่า temp นี้ น้อยกว่า จำนวนประตูมิติที่เราจะเช็ค
      tempSearchId < onwardsPortal.length &&
      // และ location ของแต่ละประตูมิติ เราเดินผ่านมาหมดแล้ว
      onwardsPortal[tempSearchId].location <= currBlock
    ) {
      // ให้เพิ่ม index ที่เราจะเริ่มหา
      tempSearchId++;
    }
    // เอาไปใส่ค่า ที่เราต้องการหา
    blockSearchId = tempSearchId;

    // แล้วเราก็ loop อีกชั้น โดยเริ่มหาจาก index ที่เราเลื่อนไปแล้ว
    // ซึ่ง loop ไปแต่ต้องน้อยกว่า ความยาวของประตูมิติที่เรา filter มาแล้ว
    for (let i = blockSearchId; i < onwardsPortal.length; i++) {
      // อันนี้แค่เก็บค่าให้อ่านง่ายขึ้นเฉย ๆ
      const portal = onwardsPortal[i];

      // ถ้า location ของประตูมิติ มีค่ามากกว่า ตำแหน่งที่เรายืนอยู่ + จำนวนก้าวที่เราเดินได้สูงสุด ให้ออกจากลูปนี้
      if (portal.location > currBlock + 11) {
        break;
      }

      // ถ้าผ่าน condition ด้านบนมาได้ เราจะดูว่า destination ที่เราไปได้ มันได้ไปตำแหน่งดีกว่าเราเดินเองเฉย ๆ ไหม
      if (portal.destination > bestPosThisTurn) {
        // ถ้าใช่ก็ไป เรา assign ค่าทิ้งไว้ใน bestPosThisTurn ก่อน
        bestPosThisTurn = portal.destination;
      }
    }

    // ผ่านด้านบนมาหมดแล้ว ค่อยย้ายตัวเราไปจริง ๆ
    currBlock = bestPosThisTurn;
  }

  // สุดท้าย เพราะทุกรอบเรานับ currTurn ที่ด้านบนสุด เพราะงั้นคืนค่าเป็น จำนวนตาที่เราเดิน
  return currTurn;
}

const portals = [
  { location: 55, destination: 38 },
  { location: 14, destination: 35 },
  { location: 91, destination: 48 },
  { location: 30, destination: 8 },
  { location: 31, destination: 70 },
  { location: 63, destination: 83 },
  { location: 3, destination: 39 },
  { location: 47, destination: 86 },
  { location: 71, destination: 93 },
  { location: 21, destination: 4 },
  { location: 44, destination: 65 },
  { location: 96, destination: 66 },
  { location: 79, destination: 42 },
  { location: 87, destination: 54 },
  { location: 90, destination: 119 },
  { location: 120, destination: 149 },
  { location: 150, destination: 179 },
  { location: 180, destination: 200 },
];

console.log(quickestPath(portals)); // expected 6

// แต่อันนี้ดูจะมีข้อเสียที่มันแหกกฎ เอาประตูมิติออก แล้วก็ยังไม่นับเรื่องว่า ถ้าประตูมิติมันไม่ได้เชื่อมกัน แล้วบางตาต้องเดินเฉย ๆ จะทำยังไง
