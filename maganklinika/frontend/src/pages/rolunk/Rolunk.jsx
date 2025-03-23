import React from 'react';
import './rolunk.css';

const Rolunk = () => {
  return (
    <div className="rolunk-container">
      <h1 className="rolunk-title">Rólunk</h1>

      <section className="rolunk-card">
        <h2>Magánklinikánk története</h2>
        <p>
          Klinikánk több mint két évtizedes múltra tekint vissza. Az alapítók célja az volt, hogy
          olyan egészségügyi intézményt hozzanak létre, amely ötvözi a legmodernebb orvosi
          technológiákat a betegközpontú megközelítéssel. Az évek során folyamatosan bővítettük
          szolgáltatásainkat, és ma már a régió egyik legelismertebb magánklinikájaként működünk.
        </p>
      </section>

      <section className="rolunk-card">
        <h2>Orvosi csapatunk</h2>
        <p>
          Klinikánkon elismert szakemberek dolgoznak, akik elkötelezettek a legmodernebb orvosi
          technológiák és kezelési módszerek alkalmazása iránt. Csapatunk tagjai között tapasztalt
          sebészek, kardiológusok, ortopéd szakorvosok és bőrgyógyászok is megtalálhatók.
        </p>
      </section>

      <section className="rolunk-card">
        <h2>Szolgáltatásaink</h2>
        <ul>
          <li>Általános orvosi konzultáció</li>
          <li>Szakorvosi ellátás számos területen</li>
          <li>Laborvizsgálatok és diagnosztika</li>
          <li>Képalkotó diagnosztikai vizsgálatok (röntgen, MRI, CT)</li>
          <li>Kisebb és nagyobb műtéti beavatkozások</li>
          <li>Rehabilitációs és fizioterápiás kezelések</li>
          <li>Egészségmegőrző programok és életmód tanácsadás</li>
        </ul>
      </section>

      <section className="rolunk-card">
        <h2>Missziónk és víziónk</h2>
        <p>
          Klinikánk küldetése, hogy minden páciensünk számára magas színvonalú, biztonságos és
          személyre szabott egészségügyi ellátást nyújtsunk.
        </p>
        <p>
          Jövőképünk egy olyan egészségügyi intézmény, amely folyamatosan fejlődik, innovatív
          megoldásokat vezet be, és ahol a páciensek biztonsága és elégedettsége áll a középpontban.
        </p>
      </section>

      <section className="rolunk-card">
        <h2>Minőségbiztosítás</h2>
        <p>
          Klinikánk elkötelezett a minőség és a biztonság mellett. Modern eszközökkel és szigorú
          protokollokkal garantáljuk a legmagasabb szintű egészségügyi ellátást pácienseink számára.
        </p>
      </section>
    </div>
  );
};

export default Rolunk;
