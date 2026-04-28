import { QuestionType, ExamData } from '../types';

export const EXAM_DATA: ExamData = {
  title: "ASESMEN AKHIR SEMESTER",
  year: "2025/2026",
  school: "SDN KOTA MADIUN",
  subject: "Pendidikan Agama Kristen dan Budi Pekerti",
  class: "VI (Enam)/ Genap",
  durationMinutes: 90,
  questions: [
    // PILIHAN GANDA (1-25)
    {
      id: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Arti ibadah yang sejati menurut kitab Roma 12:1-8 adalah ....",
      options: [
        "A. mempersembahkan tubuh kita sebagai persembahan yang hidup",
        "B. mempersembahkan semua kekayaan yang dimilikinya",
        "C. mempersembahkan memakai tangan kanan",
        "D. sepanjang hari menghabiskan waktu untuk di gereja"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Banyak orang disekeliling kita, yang dimaksud Sesama kita adalah ....",
      options: [
        "A. orang yang sudah kita kenal",
        "B. orang yang seiman",
        "C. orang yang seusia dengan kita",
        "D. semua orang disekitar kita"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 3,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Bangsa Indonesia dikenal sebagai masyarakat yang beragam, untuk itu hendaklah kita saling ....",
      options: [
        "A. menghargai dan melengkapi",
        "B. bersaing dan berlomba",
        "C. iri hati dan memiliki",
        "D. seia sekata"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 4,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Tuhan Allah maha kuasa menciptakan dunia dan isinya. Ciptaan Tuhan pada hari terakhir adalah ....",
      options: [
        "A. binatang air",
        "B. manusia",
        "C. tumbuhan",
        "D. binatang udara"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 5,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Menjaga kebersihan lingkungan rumah harus dilakukan karena ini menjadi tanggung jawab ....",
      options: [
        "A. Pembantu rumah tangga",
        "B. semua orang tua",
        "C. semua anak-anak",
        "D. semua anggota keluarga"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 6,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Keluarga Kristen akan mengajarkan pendidikan bagi anggotanya sesuai dengan nilai-nilai ....",
      options: [
        "A. ajaran Kristiani",
        "B. kemanusiaan",
        "C. budaya",
        "D. Pancasila"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 7,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Nilai-nilai Kristiani diajarkan disekolah untuk melatih hidup sesuai dengan ajaran. . . .",
      options: [
        "A. Pendidikan orang tua",
        "B. ajaran bapak pendeta",
        "C. Iman kristen",
        "D. ajaran gereja"
      ],
      correctAnswer: "C",
      score: 1
    },
    {
      id: 8,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Tuhan memelihara seluruh ciptaan-Nya, termasuk manusia, dengan ....",
      options: [
        "A. sepenuh hati",
        "B. semangat yang tinggi",
        "C. cinta kasih-Nya",
        "D. sungguh-sungguh"
      ],
      correctAnswer: "C",
      score: 1
    },
    {
      id: 9,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Yesus Kristus telah lahir menyelamatkan kita dari dosa. Sikap yang paling tepat dilakukan agar kita tidak jatuh dalam dosa adalah. . . .",
      options: [
        "A. taat melakukan perintah Tuhan setiap saat",
        "B. menjauhi teman yang tidak jujur",
        "C. bergaul dengan teman yang baik",
        "D. waspada agar tidak tergoda ajakan teman melanggar peraturaan sekolah"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 10,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Setiap orang yang percaya kepada Tuhan Yesus tidak binasa tetapi memperoleh hidup ....",
      options: [
        "A. damai",
        "B. kekal",
        "C. aman",
        "D. tentram"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 11,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Perhatikan pernyataan dibawah ini! \n1) Beranjang sana \n2) Berdamai dengan semua orang \n3) Perbuatan marah, geram, kejahatan \n4) Kata kata kotor yang keluar dari mulut \n5) Berdusta \nCiri- ciri manusia lama menurut Kolose 3:8-9 adalah . . . .",
      options: [
        "A. 1, 2 dan 3",
        "B. 1, 3 dan 4",
        "C. 2, 4 dan 5",
        "D. 3, 4 dan 5"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 12,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Yemima adalah seorang anak yang mudah sekali marah. Jika ada teman yang tidak sengaja menyenggolnya, Yemima seringkali marah dan memaki temannya. Setelah sadar, Yemima berubah sikapnya. Dahulu ia suka marah, sekarang menjadi lebih ....",
      options: [
        "A. pemberani",
        "B. percaya diri",
        "C. sabar",
        "D. jujur"
      ],
      correctAnswer: "C",
      score: 1
    },
    {
      id: 13,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Kata-kata yang diucapkan oleh Tuhan Yesus kepada Zakheus setelah bertobat adalah . . . .",
      options: [
        "A. “Hari ini terjadi keselamatan atas rumah ini”",
        "B. “Hari ini ada seorang pribadi lahir baru”",
        "C. “Hari ini Tuhan menyelamatkan jiwa baru”",
        "D. “Hari ini Tuhan menyatakan karya keselamatan”"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 14,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Indonesia terdiri banyak pulau besar dan kecil. Di tiap pulau tersebut penduduknya hidup dan berkarya. Masyarakat yang hidup di sebuah daerah, tentu memiliki kebutuhan yang berbeda-beda, namun sebagai sebuah negara, kita memiliki kebutuhan rohani yang sama yaitu ....",
      options: [
        "A. transportasi yang aman",
        "B. sandang, pangan dan papan",
        "C. rasa aman, adil, tercukupi, dan damai sejahtera",
        "D. pekerjaan yang layak"
      ],
      correctAnswer: "C",
      score: 1
    },
    {
      id: 15,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Sepuluh Hukum Allah diringkas oleh Tuhan Yesus menjadi Hukum Kasih, yang menjelaskan hubungan dengan Tuhan dan dengan sesama tertulis dalam kitab ....",
      options: [
        "A. Matius 12:37-39",
        "B. Matius 22:37-39",
        "C. Markus 12:37-39",
        "D. Markus 22:37-39"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 16,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Perhatikan pernyataan berikut ini! \n1. Jody tidak suka ketika melihat temannya berhasil \n2. Mila membantu Rosi dan Nani saat mereka tidak dapat mengerjakan tugas \n3. Hendri suka membully temannya yang berbeda suku \n4. Kezia sangat ramah kepada teman-temannya \n5. Arinda selalu mengerjakan tugas kelompoknya sendirian \nDari pernyataan di atas, yang tidak termasuk sikap egois dinyatakan pada nomor . . . .",
      options: [
        "A. 1 dan 2",
        "B. 2 dan 4",
        "C. 3 dan 5",
        "D. 4 dan 5"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 17,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Mefiboset adalah anak penyandang disabilitas fisik, yang membuatnya harus mendapatkan pertolongan orang lain ketika sedang melakukan kegiatan. Disabilitas fisik maksudnya adalah orang yang ....",
      options: [
        "A. tidak mengontrol emosi dengan baik",
        "B. mempunyai kekurangan dalam melakukan kegiatan",
        "C. tidak dapat memahami pembicaraan orang lain",
        "D. Salah satu anggota tubuhnya tidak berfungsi dengan baik"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 18,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Orang-orang majus dari timur menempuh jarak yang sangat jauh untuk menemui bayi, . Setelah berhasil menemui bayi Yesus mereka menyambutnya dengan penuh sukacita dan memberikan persembahan sebagai tanda hormat dan syukur mereka. Persembahan mereka adalah ....",
      options: [
        "A. Mas, perak dan kemenyan",
        "B. Mas, perunggu dan kemenyan",
        "C. Mas, kemenyan dan belerang",
        "D. Mas, kemenyan dan mur"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 19,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Manusia baru berarti kita mau meninggalkan sikap hidup manusia lama yang bertentangan dengan Firman Tuhan. Tentu tidak mudah menerapkan sikap hidup manusia baru dan pasti banyak godaan dan tantangan untuk mempraktikkan sikap hidup manusia baru. Tindakan yang harus kita lakukan untuk menghadapi tantangan tersebut adalah ....",
      options: [
        "A. berusaha keras untuk menjauhi tantangan",
        "B. berdoa memohon pertolongan Tuhan agar dimampukan",
        "C. berusaha hidup berdampingan dengan tantangan",
        "D. bersikap cuek dengan teman yang masih hidup lama"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 20,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Perhatikan pernyataan dibawah ini! \n1) Debora mengambil buku temannya tanpa ijin. Setelah mengembalikan buku tersebut, dia minta maaf dan berjanji tidak akan mengulangi. \n2) Lydia menghibur temannya yang sedang berduka \n3) Anik mau membantu ibunya, kalau diberi upah \n4) Yanti membawa catatan kecil yang akan dipakai mencontek waktu ulangan \n5) Nining lebih senang jalan-jalan pada hari Minggu \nSikap anak-anak yang sudah bertobat ditunjukkan pada nomor . . . .",
      options: [
        "A. 4) dan 5)",
        "B. 3) dan 4)",
        "C. 2) dan 3)",
        "D. 1) dan 2)"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 21,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Perbedaan diciptakan bukan untuk membeda-bedakan atau memecah belah, dan juga bukan untuk saling bersaing untuk memegahkan dan menonjolkan diri, tetapi perbedaan diciptakan untuk saling ....",
      options: [
        "A. mengelompokkan",
        "B. melengkapi",
        "C. menyendiri",
        "D. membiarkan"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 22,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Firman Tuhan berkata, “Karena Anak Manusia juga datang bukan untuk dilayani, melainkan untuk melayani dan untuk memberikan nyawa-Nya menjadi tebusan bagi banyak orang”, nats tertulis dalam kitab ....",
      options: [
        "A. Markus 10:45",
        "B. Markus 15:10",
        "C. Matius 10:45",
        "D. Matius 15:10"
      ],
      correctAnswer: "A",
      score: 1
    },
    {
      id: 23,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Perhatikan pernyataan dibawah ini! \n1) Di RT 8 kampung sukadamai bersepakat untuk mengabaikan orang-orang yang berbeda bahasanya \n2) Saat pemilihan ketua kelas VI, yang dipilih untuk menjadi ketua yang berasal dari suku Jawa saja \n3) Jonathan mau kerja kelompok dengan teman yang satu agama \n4) Rino menggunakan Bahasa Indonesia ketika berbicara kepada teman yang berbeda suku \n5) Sony memberikan ucapan selamat hari raya kepada Dany yang berbeda agama \nDari pernyataan-pernyataan diatas sikap toleransi ditunjukkan pada pernyataan nomor . . . .",
      options: [
        "A. 1) dan 2)",
        "B. 2) dan 3)",
        "C. 3) dan 4)",
        "D. 4) dan 5)"
      ],
      correctAnswer: "D",
      score: 1
    },
    {
      id: 24,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Manusia diciptakan serupa dan segambar dengan Allah, artinya manusia diciptakan dan dilengkapi dengan sifat-sifat Allah. Sifat-sifat yang diberikan Allah kepada manusia yaitu ...",
      options: [
        "A. Kasih, kemenangan dan akal budi",
        "B. Kasih, kesucian dan akal budi",
        "C. Kasih, keberanian dan akal sehat",
        "D. Kasih, kesucian dan akal sehat"
      ],
      correctAnswer: "B",
      score: 1
    },
    {
      id: 25,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Tokoh Alkitab yang menjaga lingkungan dan melakukan tugas yang diberikan Allah dengan membangun bahtera untuk menyelamatkan berbagai macam makhluk hidup dari air bah adalah ....",
      options: [
        "A. Nabi Nuh",
        "B. Nabi Yesaya",
        "C. Raja Daud",
        "D. Raja Salomo"
      ],
      correctAnswer: "A",
      score: 1
    },
    // MATCHING (26-35)
    {
      id: 26,
      type: QuestionType.MATCHING,
      question: "Surat Roma banyak menjelaskan tentang injil. Penulis surat Roma",
      matchingOptions: [
        { label: "A", text: "Iman dan Lewi" },
        { label: "B", text: "melayani" },
        { label: "C", text: "ada angin ribut" },
        { label: "D", text: "kecewa" },
        { label: "E", text: "sedih" },
        { label: "F", text: "Cagar alam" },
        { label: "G", text: "Rasul Paulus" },
        { label: "H", text: "Daud" },
        { label: "I", text: "diskriminasi" },
        { label: "J", text: "Saulus" },
        { label: "K", text: "Tripitaka" },
        { label: "L", text: "tebang pilih" }
      ],
      correctAnswer: "G",
      score: 1
    },
    {
      id: 27,
      type: QuestionType.MATCHING,
      question: "Kitab mazmur berisi nyanyian dan Doa. Penulis kitab mazmur",
      correctAnswer: "H",
      score: 1
    },
    {
      id: 28,
      type: QuestionType.MATCHING,
      question: "Perasaan janda dari Nain sebelum ditolong oleh Tuhan Yesus",
      correctAnswer: "E",
      score: 1
    },
    {
      id: 29,
      type: QuestionType.MATCHING,
      question: "Orang yang lewat dan tidak mau menolong orang yang dirampok berdasarkan perumpamaan orang Samaria yang murah hati",
      correctAnswer: "A",
      score: 1
    },
    {
      id: 30,
      type: QuestionType.MATCHING,
      question: "Ketika Yesus sedang naik perahu bersama murid-Nya terjadi hal yang berbahaya",
      correctAnswer: "C",
      score: 1
    },
    {
      id: 31,
      type: QuestionType.MATCHING,
      question: "Nama Rasul Paulus sebelum bertobat",
      correctAnswer: "J",
      score: 1
    },
    {
      id: 32,
      type: QuestionType.MATCHING,
      question: "Pembedaan perlakuan terhadap sesama warga negara berdasarkan warna Kulit, golongan, suku, ekonomi, agama dan sebagainya",
      correctAnswer: "I",
      score: 1
    },
    {
      id: 33,
      type: QuestionType.MATCHING,
      question: "Setiap agama mempunyai Kitab Suci yang menjadi pedoman dalam kehidupan Kitab suci agama Budha.",
      correctAnswer: "K",
      score: 1
    },
    {
      id: 34,
      type: QuestionType.MATCHING,
      question: "Menebang pohon yang siap dipakai dan membiarkan pohon yang belum Siap dipakai",
      correctAnswer: "L",
      score: 1
    },
    {
      id: 35,
      type: QuestionType.MATCHING,
      question: "Tempat untuk melindungi tumbuh-tumbuhan",
      correctAnswer: "F",
      score: 1
    },
    // FILLING (36-45)
    {
      id: 36,
      type: QuestionType.FILL_IN,
      question: "Banyak hal yang dapat dilakukan anak-anak untuk dapat melayani Tuhan di ibadah . . . .",
      correctAnswer: "Sekolah Minggu",
      score: 2
    },
    {
      id: 37,
      type: QuestionType.FILL_IN,
      question: "Tuhan menciptakan dunia dan isinya selama 6 hari. Pada hari yang ke 2 Tuhan menciptakan . . . .",
      correctAnswer: "Cakrawala",
      score: 2
    },
    {
      id: 38,
      type: QuestionType.FILL_IN,
      question: "Suatu kebiasaan yang baik, apabila kita membuang sampah di . . . .",
      correctAnswer: "Tempat Sampah",
      score: 2
    },
    {
      id: 39,
      type: QuestionType.FILL_IN,
      question: "Pengampunan yang diberikan Tuhan Yesus kepada kita, hendaknya bisa mendorong kita untuk mau . . . . sesama",
      correctAnswer: "Mengampuni / Memaafkan",
      score: 2
    },
    {
      id: 40,
      type: QuestionType.FILL_IN,
      question: "Dosa membuat hubungan manusia dengan Allah menjadi . . . .",
      correctAnswer: "Putus / terputus",
      score: 2
    },
    {
      id: 41,
      type: QuestionType.FILL_IN,
      question: "Jero sebelumnya adalah anak yang nakal, namun setelah mengenal Kristus, Jero menjadi anak yang baik. Ia selalu membantu teman-temannya, banyak yang suka kepadanya. Perubahan yang dialami Jero termasuk perubahan . . . .",
      correctAnswer: "Sikap",
      score: 2
    },
    {
      id: 42,
      type: QuestionType.FILL_IN,
      question: "Sebelum bertobat, Paulus adalah seorang pembenci pengikut Kristus, Paulus bertobat dalam perjalanannya hendak menganiaya dan membunuh orang-orang percaya di kota . . . .",
      correctAnswer: "Damsyik",
      score: 2
    },
    {
      id: 43,
      type: QuestionType.FILL_IN,
      question: "Taman Eden menjadi gambaran keindahan alam ciptaan Allah, Taman Eden menjadi tempat manusia pertama yaitu Adam dan Hawa. Dalam bahasa Ibrani Eden berarti . . . .",
      correctAnswer: "Menyenangkan",
      score: 2
    },
    {
      id: 44,
      type: QuestionType.FILL_IN,
      question: "Yakub bersahabat dengan Abdullah, mereka memiliki perbedaan keyakinan. Pada saat Abdullah merayakan hari raya Idul Fitri, Yakob datang ke rumahnya untuk memberikan ucapan. Abdullah merasa senang bersahabat dengan Yakub meskipun Yakub beragama Kristen. Persahabatan mereka merupakan contoh toleransi . . . .",
      correctAnswer: "Beragama",
      score: 2
    },
    {
      id: 45,
      type: QuestionType.FILL_IN,
      question: "Untuk menjaga dan melestarikan alam hutan yang tanamannya sudah ditebang harus ditanami kembali. Penanaman kembali tanaman yang telah ditebang disebut . . . .",
      correctAnswer: "Reboisasi",
      score: 2
    },
    // ESSAY (46-50)
    {
      id: 46,
      type: QuestionType.ESSAY,
      question: "Banyak hal yang dapat kita lakukan disekolah. Sebutkan 3 perbuatan disekolah yang termasuk ibadah?",
      correctAnswer: "Piket, berbagi makanan, menolong teman dll (Kebijakan Guru)",
      score: 3
    },
    {
      id: 47,
      type: QuestionType.ESSAY,
      question: "Tuhan menghendaki kita hidup dalam pertobatan. Jelaskan bagaimana hidup orang Kristen yang sudah bertobat?",
      correctAnswer: "Hidup sesuai Firman Tuhan",
      score: 3
    },
    {
      id: 48,
      type: QuestionType.ESSAY,
      question: "Kita dapat melakukan kegiatan melayani dimana saja. Di gereja, sekolah, rumah dan sekitar kita. Sebutkan 3 contoh pelayanan yang dapat dilakukan di gereja?",
      correctAnswer: "Mengedarkan Kantong Kolekte, Singer, Memimpin pujian dll (Kebijakan Guru)",
      score: 3
    },
    {
      id: 49,
      type: QuestionType.ESSAY,
      question: "Ada empat sungai yang mengalir di taman Eden. Sebutkan nama-nama sungai yang mengalir di Taman Eden?",
      correctAnswer: "Pison, Gihon, Tigris, Efrat",
      score: 3
    },
    {
      id: 50,
      type: QuestionType.ESSAY,
      question: "Manusia diberi tanggungjawab oleh Tuhan untuk menjaga alam untuk kelangsungan hidupnya. Sebutkan 2 tindakan yang dapat kamu lakukan untuk menjaga lingkungan!",
      correctAnswer: "Membuang sampah pada tempatnya, menjaga kebersihan lingkungan, merawat tanaman disekitar rumah dll (Kebijakan Guru)",
      score: 3
    }
  ]
};
