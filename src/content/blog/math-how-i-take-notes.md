---
title: 怎样写一则数学笔记
description: 定义、例子、证明分开写；公式用 $...$ 和 $$...$$。
pubDate: 2026-09-16
topic: math
tags:
  - 方法
  - 笔记
---

数学笔记我不写成课堂实录，而是尽量收成三块：**定义**、**例子**、**卡点**。公式可以直接写在 Markdown 里。

## 行内公式

映射写成 $f: X \to Y$，实数集写成 $\mathbb{R}$。欧拉公式 $e^{i\pi} + 1 = 0$ 也放在句子里。

## 独立一行

勾股定理：

$$
a^2 + b^2 = c^2
$$

极限的 $\varepsilon$-$\delta$ 说法：

$$
\lim_{x \to a} f(x) = L
\iff
\forall \varepsilon > 0,\ \exists \delta > 0,\ 
0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon
$$

## 我给自己的格式

1. **定义**：原话抄准，符号写全。
2. **例子**：一个能算的，一个会反例的。
3. **卡点**：哪一步没跟上，后来是哪句话解开的。

笔记里也可以放代码块，方便对照：

```tex
\lim_{x \to a} f(x) = L
```

硬件笔记里的公式同样能用这套写法，例如欧姆定律 $V = IR$。
