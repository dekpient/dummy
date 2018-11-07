/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import * as R from "ramda";

let names = R.pipe(
  R.addIndex(R.map)((name, index) => ({ name, phone: index })),
  R.groupBy(({ name }) => name[0].toUpperCase()),
  R.toPairs,
  R.map(([header, items]) => ({ header, items }))
)(require('./names'));

let alphabets = R.map(R.prop("header"), names);

let contacts = [
  {
    header: "A",
    items: [
      {
        name: "Apple",
        phone: "13333333333"
      },
      {
        name: "App",
        phone: "13333333443"
      },
      {
        name: "Aee",
        phone: "13333333553"
      },
      {
        name: "Aliy",
        phone: "13336633333"
      },
      {
        name: "Amliy",
        phone: "13333333003"
      },
      {
        name: "Anni",
        phone: "13123333333"
      },
      {
        name: "Akali",
        phone: "13322333333"
      },
      {
        name: "All",
        phone: "13333333333"
      },
      {
        name: "Aba",
        phone: "13333333310"
      },
      {
        name: "Appqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "B",
    items: [
      {
        name: "Bpple",
        phone: "13333333333"
      },
      {
        name: "Bpp",
        phone: "13333333443"
      },
      {
        name: "Bee",
        phone: "13333333553"
      },
      {
        name: "Bliy",
        phone: "13336633333"
      },
      {
        name: "Bmliy",
        phone: "13333333003"
      },
      {
        name: "Bnni",
        phone: "13123333333"
      },
      {
        name: "Bkali",
        phone: "13322333333"
      },
      {
        name: "Bll",
        phone: "13333333333"
      },
      {
        name: "Bba",
        phone: "13333333310"
      },
      {
        name: "Bppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "C",
    items: [
      {
        name: "Cpple",
        phone: "13333333333"
      },
      {
        name: "Cpp",
        phone: "13333333443"
      },
      {
        name: "Cee",
        phone: "13333333553"
      },
      {
        name: "Cliy",
        phone: "13336633333"
      },
      {
        name: "Cmliy",
        phone: "13333333003"
      },
      {
        name: "Cnni",
        phone: "13123333333"
      },
      {
        name: "Ckali",
        phone: "13322333333"
      },
      {
        name: "Cll",
        phone: "13333333333"
      },
      {
        name: "Cba",
        phone: "13333333310"
      },
      {
        name: "Cppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "D",
    items: [
      {
        name: "Dpple",
        phone: "13333333333"
      },
      {
        name: "Dpp",
        phone: "13333333443"
      },
      {
        name: "Dee",
        phone: "13333333553"
      },
      {
        name: "Dliy",
        phone: "13336633333"
      },
      {
        name: "Dmliy",
        phone: "13333333003"
      },
      {
        name: "Dnni",
        phone: "13123333333"
      },
      {
        name: "Dkali",
        phone: "13322333333"
      },
      {
        name: "Dll",
        phone: "13333333333"
      },
      {
        name: "Dba",
        phone: "13333333310"
      },
      {
        name: "Dppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "E",
    items: [
      {
        name: "Epple",
        phone: "13333333333"
      },
      {
        name: "Epp",
        phone: "13333333443"
      },
      {
        name: "Eee",
        phone: "13333333553"
      },
      {
        name: "Eliy",
        phone: "13336633333"
      },
      {
        name: "Emliy",
        phone: "13333333003"
      },
      {
        name: "Enni",
        phone: "13123333333"
      },
      {
        name: "Ekali",
        phone: "13322333333"
      },
      {
        name: "Ell",
        phone: "13333333333"
      },
      {
        name: "Eba",
        phone: "13333333310"
      },
      {
        name: "Eppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "F",
    items: [
      {
        name: "Fpple",
        phone: "13333333333"
      },
      {
        name: "Fpp",
        phone: "13333333443"
      },
      {
        name: "Fee",
        phone: "13333333553"
      },
      {
        name: "Fliy",
        phone: "13336633333"
      },
      {
        name: "Fmliy",
        phone: "13333333003"
      },
      {
        name: "Fnni",
        phone: "13123333333"
      },
      {
        name: "Fkali",
        phone: "13322333333"
      },
      {
        name: "Fll",
        phone: "13333333333"
      },
      {
        name: "Fba",
        phone: "13333333310"
      },
      {
        name: "Fppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "G",
    items: [
      {
        name: "Gpple",
        phone: "13333333333"
      },
      {
        name: "Gpp",
        phone: "13333333443"
      },
      {
        name: "Gee",
        phone: "13333333553"
      },
      {
        name: "Gliy",
        phone: "13336633333"
      },
      {
        name: "Gmliy",
        phone: "13333333003"
      },
      {
        name: "Gnni",
        phone: "13123333333"
      },
      {
        name: "Gkali",
        phone: "13322333333"
      },
      {
        name: "Gll",
        phone: "13333333333"
      },
      {
        name: "Gba",
        phone: "13333333310"
      },
      {
        name: "Gppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "H",
    items: [
      {
        name: "Hpple",
        phone: "13333333333"
      },
      {
        name: "Hpp",
        phone: "13333333443"
      },
      {
        name: "Hee",
        phone: "13333333553"
      },
      {
        name: "Hliy",
        phone: "13336633333"
      },
      {
        name: "Hmliy",
        phone: "13333333003"
      },
      {
        name: "Hnni",
        phone: "13123333333"
      },
      {
        name: "Hkali",
        phone: "13322333333"
      },
      {
        name: "Hll",
        phone: "13333333333"
      },
      {
        name: "Hba",
        phone: "13333333310"
      },
      {
        name: "Hppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "I",
    items: [
      {
        name: "Ipple",
        phone: "13333333333"
      },
      {
        name: "Ipp",
        phone: "13333333443"
      },
      {
        name: "Iee",
        phone: "13333333553"
      },
      {
        name: "Iliy",
        phone: "13336633333"
      },
      {
        name: "Imliy",
        phone: "13333333003"
      },
      {
        name: "Inni",
        phone: "13123333333"
      },
      {
        name: "Ikali",
        phone: "13322333333"
      },
      {
        name: "Ill",
        phone: "13333333333"
      },
      {
        name: "Iba",
        phone: "13333333310"
      },
      {
        name: "Ippqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "J",
    items: [
      {
        name: "Jpple",
        phone: "13333333333"
      },
      {
        name: "Jpp",
        phone: "13333333443"
      },
      {
        name: "Jee",
        phone: "13333333553"
      },
      {
        name: "Jliy",
        phone: "13336633333"
      },
      {
        name: "Jmliy",
        phone: "13333333003"
      },
      {
        name: "Jnni",
        phone: "13123333333"
      },
      {
        name: "Jkali",
        phone: "13322333333"
      },
      {
        name: "Jll",
        phone: "13333333333"
      },
      {
        name: "Jba",
        phone: "13333333310"
      },
      {
        name: "Jppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "K",
    items: [
      {
        name: "Kpple",
        phone: "13333333333"
      },
      {
        name: "Kpp",
        phone: "13333333443"
      },
      {
        name: "Kee",
        phone: "13333333553"
      },
      {
        name: "Kliy",
        phone: "13336633333"
      },
      {
        name: "Kmliy",
        phone: "13333333003"
      },
      {
        name: "Knni",
        phone: "13123333333"
      },
      {
        name: "Kkali",
        phone: "13322333333"
      },
      {
        name: "Kll",
        phone: "13333333333"
      },
      {
        name: "Kba",
        phone: "13333333310"
      },
      {
        name: "Kppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "L",
    items: [
      {
        name: "Lpple",
        phone: "13333333333"
      },
      {
        name: "Lpp",
        phone: "13333333443"
      },
      {
        name: "Lee",
        phone: "13333333553"
      },
      {
        name: "Lliy",
        phone: "13336633333"
      },
      {
        name: "Lmliy",
        phone: "13333333003"
      },
      {
        name: "Lnni",
        phone: "13123333333"
      },
      {
        name: "Lkali",
        phone: "13322333333"
      },
      {
        name: "Lll",
        phone: "13333333333"
      },
      {
        name: "Lba",
        phone: "13333333310"
      },
      {
        name: "Lppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "M",
    items: [
      {
        name: "Mpple",
        phone: "13333333333"
      },
      {
        name: "Mpp",
        phone: "13333333443"
      },
      {
        name: "Mee",
        phone: "13333333553"
      },
      {
        name: "Mliy",
        phone: "13336633333"
      },
      {
        name: "Mmliy",
        phone: "13333333003"
      },
      {
        name: "Mnni",
        phone: "13123333333"
      },
      {
        name: "Mkali",
        phone: "13322333333"
      },
      {
        name: "Mll",
        phone: "13333333333"
      },
      {
        name: "Mba",
        phone: "13333333310"
      },
      {
        name: "Mppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "N",
    items: [
      {
        name: "Npple",
        phone: "13333333333"
      },
      {
        name: "Npp",
        phone: "13333333443"
      },
      {
        name: "Nee",
        phone: "13333333553"
      },
      {
        name: "Nliy",
        phone: "13336633333"
      },
      {
        name: "Nmliy",
        phone: "13333333003"
      },
      {
        name: "Nnni",
        phone: "13123333333"
      },
      {
        name: "Nkali",
        phone: "13322333333"
      },
      {
        name: "Nll",
        phone: "13333333333"
      },
      {
        name: "Nba",
        phone: "13333333310"
      },
      {
        name: "Nppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "O",
    items: [
      {
        name: "Opple",
        phone: "13333333333"
      },
      {
        name: "Opp",
        phone: "13333333443"
      },
      {
        name: "Oee",
        phone: "13333333553"
      },
      {
        name: "Oliy",
        phone: "13336633333"
      },
      {
        name: "Omliy",
        phone: "13333333003"
      },
      {
        name: "Onni",
        phone: "13123333333"
      },
      {
        name: "Okali",
        phone: "13322333333"
      },
      {
        name: "Oll",
        phone: "13333333333"
      },
      {
        name: "Oba",
        phone: "13333333310"
      },
      {
        name: "Oppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "P",
    items: [
      {
        name: "Ppple",
        phone: "13333333333"
      },
      {
        name: "Ppp",
        phone: "13333333443"
      },
      {
        name: "Pee",
        phone: "13333333553"
      },
      {
        name: "Pliy",
        phone: "13336633333"
      },
      {
        name: "Pmliy",
        phone: "13333333003"
      },
      {
        name: "Pnni",
        phone: "13123333333"
      },
      {
        name: "Pkali",
        phone: "13322333333"
      },
      {
        name: "Pll",
        phone: "13333333333"
      },
      {
        name: "Pba",
        phone: "13333333310"
      },
      {
        name: "Pppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Q",
    items: [
      {
        name: "Qpple",
        phone: "13333333333"
      },
      {
        name: "Qpp",
        phone: "13333333443"
      },
      {
        name: "Qee",
        phone: "13333333553"
      },
      {
        name: "Qliy",
        phone: "13336633333"
      },
      {
        name: "Qmliy",
        phone: "13333333003"
      },
      {
        name: "Qnni",
        phone: "13123333333"
      },
      {
        name: "Qkali",
        phone: "13322333333"
      },
      {
        name: "Qll",
        phone: "13333333333"
      },
      {
        name: "Qba",
        phone: "13333333310"
      },
      {
        name: "Qppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "R",
    items: [
      {
        name: "Rpple",
        phone: "13333333333"
      },
      {
        name: "Rpp",
        phone: "13333333443"
      },
      {
        name: "Ree",
        phone: "13333333553"
      },
      {
        name: "Rliy",
        phone: "13336633333"
      },
      {
        name: "Rmliy",
        phone: "13333333003"
      },
      {
        name: "Rnni",
        phone: "13123333333"
      },
      {
        name: "Rkali",
        phone: "13322333333"
      },
      {
        name: "Rll",
        phone: "13333333333"
      },
      {
        name: "Rba",
        phone: "13333333310"
      },
      {
        name: "Rppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "S",
    items: [
      {
        name: "Spple",
        phone: "13333333333"
      },
      {
        name: "Spp",
        phone: "13333333443"
      },
      {
        name: "See",
        phone: "13333333553"
      },
      {
        name: "Sliy",
        phone: "13336633333"
      },
      {
        name: "Smliy",
        phone: "13333333003"
      },
      {
        name: "Snni",
        phone: "13123333333"
      },
      {
        name: "Skali",
        phone: "13322333333"
      },
      {
        name: "Sll",
        phone: "13333333333"
      },
      {
        name: "Sba",
        phone: "13333333310"
      },
      {
        name: "Sppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "T",
    items: [
      {
        name: "Tpple",
        phone: "13333333333"
      },
      {
        name: "Tpp",
        phone: "13333333443"
      },
      {
        name: "Tee",
        phone: "13333333553"
      },
      {
        name: "Tliy",
        phone: "13336633333"
      },
      {
        name: "Tmliy",
        phone: "13333333003"
      },
      {
        name: "Tnni",
        phone: "13123333333"
      },
      {
        name: "Tkali",
        phone: "13322333333"
      },
      {
        name: "Tll",
        phone: "13333333333"
      },
      {
        name: "Tba",
        phone: "13333333310"
      },
      {
        name: "Tppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "U",
    items: [
      {
        name: "Upple",
        phone: "13333333333"
      },
      {
        name: "Upp",
        phone: "13333333443"
      },
      {
        name: "Uee",
        phone: "13333333553"
      },
      {
        name: "Uliy",
        phone: "13336633333"
      },
      {
        name: "Umliy",
        phone: "13333333003"
      },
      {
        name: "Unni",
        phone: "13123333333"
      },
      {
        name: "Ukali",
        phone: "13322333333"
      },
      {
        name: "Ull",
        phone: "13333333333"
      },
      {
        name: "Uba",
        phone: "13333333310"
      },
      {
        name: "Uppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "V",
    items: [
      {
        name: "Vpple",
        phone: "13333333333"
      },
      {
        name: "Vpp",
        phone: "13333333443"
      },
      {
        name: "Vee",
        phone: "13333333553"
      },
      {
        name: "Vliy",
        phone: "13336633333"
      },
      {
        name: "Vmliy",
        phone: "13333333003"
      },
      {
        name: "Vnni",
        phone: "13123333333"
      },
      {
        name: "Vkali",
        phone: "13322333333"
      },
      {
        name: "Vll",
        phone: "13333333333"
      },
      {
        name: "Vba",
        phone: "13333333310"
      },
      {
        name: "Vppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "W",
    items: [
      {
        name: "Wpple",
        phone: "13333333333"
      },
      {
        name: "Wpp",
        phone: "13333333443"
      },
      {
        name: "Wee",
        phone: "13333333553"
      },
      {
        name: "Wliy",
        phone: "13336633333"
      },
      {
        name: "Wmliy",
        phone: "13333333003"
      },
      {
        name: "Wnni",
        phone: "13123333333"
      },
      {
        name: "Wkali",
        phone: "13322333333"
      },
      {
        name: "Wll",
        phone: "13333333333"
      },
      {
        name: "Wba",
        phone: "13333333310"
      },
      {
        name: "Wppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "X",
    items: [
      {
        name: "Xpple",
        phone: "13333333333"
      },
      {
        name: "Xpp",
        phone: "13333333443"
      },
      {
        name: "Xee",
        phone: "13333333553"
      },
      {
        name: "Xliy",
        phone: "13336633333"
      },
      {
        name: "Xmliy",
        phone: "13333333003"
      },
      {
        name: "Xnni",
        phone: "13123333333"
      },
      {
        name: "Xkali",
        phone: "13322333333"
      },
      {
        name: "Xll",
        phone: "13333333333"
      },
      {
        name: "Xba",
        phone: "13333333310"
      },
      {
        name: "Xppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Y",
    items: [
      {
        name: "Ypple",
        phone: "13333333333"
      },
      {
        name: "Ypp",
        phone: "13333333443"
      },
      {
        name: "Yee",
        phone: "13333333553"
      },
      {
        name: "Yliy",
        phone: "13336633333"
      },
      {
        name: "Ymliy",
        phone: "13333333003"
      },
      {
        name: "Ynni",
        phone: "13123333333"
      },
      {
        name: "Ykali",
        phone: "13322333333"
      },
      {
        name: "Yll",
        phone: "13333333333"
      },
      {
        name: "Yba",
        phone: "13333333310"
      },
      {
        name: "Yppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Z",
    items: [
      {
        name: "Zpple",
        phone: "13333333333"
      },
      {
        name: "Zpp",
        phone: "13333333443"
      },
      {
        name: "Zee",
        phone: "13333333553"
      },
      {
        name: "Zliy",
        phone: "13336633333"
      },
      {
        name: "Zmliy",
        phone: "13333333003"
      },
      {
        name: "Znni",
        phone: "13123333333"
      },
      {
        name: "Zkali",
        phone: "13322333333"
      },
      {
        name: "Zll",
        phone: "13333333333"
      },
      {
        name: "Zba",
        phone: "13333333310"
      },
      {
        name: "Zppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "#",
    items: [
      {
        name: "#pple",
        phone: "13333333333"
      },
      {
        name: "#pp",
        phone: "13333333443"
      },
      {
        name: "#ee",
        phone: "13333333553"
      },
      {
        name: "#liy",
        phone: "13336633333"
      },
      {
        name: "#mliy",
        phone: "13333333003"
      },
      {
        name: "#nni",
        phone: "13123333333"
      },
      {
        name: "#kali",
        phone: "13322333333"
      },
      {
        name: "#ll",
        phone: "13333333333"
      },
      {
        name: "#ba",
        phone: "13333333310"
      },
      {
        name: "#ppqq",
        phone: "13333333333"
      }
    ]
  }
];

export { contacts, names, alphabets };
