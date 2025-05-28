function quickestPath(portals) {
  // 1. สร้าง Map เพื่อให้ค้นหา portal ได้ง่ายและรวดเร็ว
  const portalMap = new Map();
  for (const portal of portals) {
    portalMap.set(portal.location, portal.destination);
  }

  // 2. สร้างคิวสำหรับ BFS โดยจะเก็บ [ตำแหน่ง, จำนวนเทิร์น]
  // เริ่มต้นที่ช่อง 1 ใช้ 0 เทิร์น
  const queue = [[1, 0]];

  // 3. สร้าง Set เพื่อเก็บช่องที่เคยไปแล้ว ป้องกันการเดินซ้ำ
  const visited = new Set([1]);

  // 4. เริ่มลูป BFS จนกว่าคิวจะว่าง
  while (queue.length > 0) {
    console.log(queue);
    console.log(visited);
    // ดึงสถานะปัจจุบันออกจากคิว
    const [currentPosition, turns] = queue.shift();
    // 5. ถ้าถึงเป้าหมาย (200) ให้คืนค่าจำนวนเทิร์น
    // เนื่องจากเป็น BFS นี่คือคำตอบที่น้อยที่สุดแน่นอน
    if (currentPosition >= 200) {
      return turns;
    }

    // 6. สำรวจทุกความเป็นไปได้ในเทิร์นถัดไป (เดิน 1-10 ช่อง)
    for (let move = 1; move <= 11; move++) {
      const nextPosition = currentPosition + move;

      // ถ้าเดินไปแล้วมี portal ให้วาร์ปไปปลายทาง ถ้าไม่มีก็อยู่ที่เดิม
      const finalPosition = portalMap.has(nextPosition)
        ? portalMap.get(nextPosition)
        : nextPosition;

      // ถ้าตำแหน่งสุดท้ายที่ไปถึงยังไม่เคยไปมาก่อน
      if (!visited.has(finalPosition)) {
        visited.add(finalPosition); // มาร์คว่าเคยมาแล้ว
        queue.push([finalPosition, turns + 1]); // เพิ่มสถานะใหม่ (เทิร์น +1) เข้าไปในคิว
      }
    }
  }

  // ถ้าวนจนหมดแล้วยังไม่ถึง 200 แสดงว่าไปไม่ถึง
  return -1;
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

console.log(`จำนวนเทิร์นที่น้อยที่สุดคือ: ${quickestPath(portals)}`); // ผลลัพธ์ที่ควรจะได้คือ 6
