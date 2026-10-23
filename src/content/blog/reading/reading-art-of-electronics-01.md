---
title: 电子学的艺术 · 第 1 章
description: 这一章我怎么理解、哪里卡住，以及习题怎么做。
pubDate: 2026-10-09
topic: reading
book: art-of-electronics
chapter: 1
tags:
  - 电子学的艺术
draft: true
---

把这一章收成三块。理解用自己的话写，难点写当时卡住的那一步，习题按题号记做法。

## 理解

## 难点

## 习题

题号写成小标题，下面写做法和答案。

### 1.1

串联时，总阻值等于各电阻相加：

$$
R_{\mathrm{串}} = R_1 + R_2 = 5\,\mathrm{k}\Omega + 10\,\mathrm{k}\Omega = 15\,\mathrm{k}\Omega
$$

并联时，总阻值等于各电阻倒数和的倒数：

$$
R_{\mathrm{并}} = \frac{R_1 R_2}{R_1 + R_2} = \frac{5\,\mathrm{k}\Omega \times 10\,\mathrm{k}\Omega}{5\,\mathrm{k}\Omega + 10\,\mathrm{k}\Omega} = 3.33\,\mathrm{k}\Omega
$$

### 1.2

功率：

$$
P = \frac{V^2}{R} = \frac{(12\,\mathrm{V})^2}{1\,\Omega} = 144\,\mathrm{W}
$$

### 1.3

略

### 1.4

略

### 1.5

电阻上的功率：

$$
P_{\mathrm{MAX}} = \frac{V^2}{R} = \frac{(15\,\mathrm{V})^2}{1\,\mathrm{k}\Omega} = 0.225\,\mathrm{W}
$$

和 $\dfrac{1}{4}\,\mathrm{W}$ 的额定功率比较：

$$
P_{\mathrm{MAX}} < \frac{1}{4}\,\mathrm{W}
$$

所以这块电阻够用。

### 1.6

(a)

### 1.7

**(a)** 仪表内阻 $20\,\mathrm{k}\Omega$，满量程 $50\,\mu\mathrm{A}$。电路如下：

<img src="/images/reading/art-of-electronics/1-7-a.png" alt="图 1.7.a" width="400">

左边 $10\,\mathrm{k}\Omega$ 是电源内阻。右边的电流计和 $20\,\mathrm{k}\Omega$ 内阻可以看成一个电压表。

总电阻：

$$
R_{\mathrm{总}} = 10\,\mathrm{k}\Omega + 20\,\mathrm{k}\Omega = 30\,\mathrm{k}\Omega
$$

电压表两端的电压：

$$
V_{\mathrm{表}} = 1\,\mathrm{V} \times \frac{20\,\mathrm{k}\Omega}{30\,\mathrm{k}\Omega} = 0.667\,\mathrm{V}
$$

**(b)** 把仪表接到分压器上：

<img src="/images/reading/art-of-electronics/1-7-b.png" alt="图 1.7.b" width="400">

要求表的读数，先把表头支路前面的电路用戴维南等效：一个电压源加一个电阻。

$$
V_{\mathrm{Th}} = V_{\mathrm{开路}} = 1\,\mathrm{V} \times \frac{10\,\mathrm{k}\Omega}{10\,\mathrm{k}\Omega + 10\,\mathrm{k}\Omega} = 0.5\,\mathrm{V}
$$

$$
I_{\mathrm{短路}} = \frac{1\,\mathrm{V}}{10\,\mathrm{k}\Omega} = 1 \times 10^{-4}\,\mathrm{A}
$$

$$
R_{\mathrm{Th}} = \frac{V_{\mathrm{Th}}}{I_{\mathrm{短路}}} = \frac{0.5\,\mathrm{V}}{1 \times 10^{-4}\,\mathrm{A}} = 5\,\mathrm{k}\Omega
$$

等效电路如下：

<img src="/images/reading/art-of-electronics/1-7-b-2.png" alt="图 1.7.b.2" width="400">

电压表两端的电压：

$$
V_{\mathrm{表}} = V_{\mathrm{Th}} \times \frac{20\,\mathrm{k}\Omega}{R_{\mathrm{Th}} + 20\,\mathrm{k}\Omega} = 0.5\,\mathrm{V} \times \frac{20\,\mathrm{k}\Omega}{5\,\mathrm{k}\Omega + 20\,\mathrm{k}\Omega} = 0.4\,\mathrm{V}
$$

### 1.8

**(a)** 表头满量程 $50\,\mu\mathrm{A}$，内阻 $R_2 = 5\,\mathrm{k}\Omega$。要改成满量程 $1\,\mathrm{A}$ 的电流表，并联分流电阻 $R_S$。

分流支路电流记作 $I_1$，表头支路电流记作 $I_2$，两端电压记作 $V$：

$$
I_1 = I - I_2 = 1\,\mathrm{A} - 50\,\mu\mathrm{A} \approx 1\,\mathrm{A}
$$

$$
V = I_2 R_2 = 50\,\mu\mathrm{A} \times 5\,\mathrm{k}\Omega = 0.25\,\mathrm{V}
$$

$$
R_S = \frac{V}{I_1} = \frac{0.25\,\mathrm{V}}{1\,\mathrm{A}} = 0.25\,\Omega
$$

**(b)** 再改成满量程 $10\,\mathrm{V}$ 的电压表，串联分压电阻 $R_3$。

表头分压记作 $V_1$，串联电阻分压记作 $V_2$：

$$
V_1 = I R_2 = 50\,\mu\mathrm{A} \times 5\,\mathrm{k}\Omega = 0.25\,\mathrm{V}
$$

$$
V_2 = 10\,\mathrm{V} - V_1 = 10\,\mathrm{V} - 0.25\,\mathrm{V} = 9.75\,\mathrm{V}
$$

$$
R_3 = \frac{V_2}{I} = \frac{9.75\,\mathrm{V}}{50\,\mu\mathrm{A}} = 195\,\mathrm{k}\Omega
$$

### 1.9

### 1.10
