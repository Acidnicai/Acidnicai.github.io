---
title: 集合、属于、包含
description: 数学语言里最先要稳住的三个符号：集合、$\in$ 和 $\subseteq$。
pubDate: 2026-09-13
topic: math
tags:
  - 集合
  - 基础
---

后面几乎所有定义都会用到集合。先把三个符号的意思钉死，读定理时才不会漂。

## 集合

集合是「一堆被明确圈出来的对象」。常用大写字母表示，例如 $A$、$B$、$\mathbb{N}$。

## 属于

$x \in A$ 读作「$x$ 是 $A$ 的元素」。它说的是**一个对象**和**一个集合**的关系。

$x \notin A$ 则是「不是」。

## 包含

$A \subseteq B$ 读作「$A$ 是 $B$ 的子集」。它说的是**两个集合**的关系：

$$
A \subseteq B \iff \forall x,\ (x \in A \Rightarrow x \in B)
$$

容易混的地方：$3 \in \mathbb{N}$ 成立，$3 \subseteq \mathbb{N}$ 一般不这么写，因为 $3$ 不是集合。

下一篇会接到函数：把「对应规则」写成 $f: A \to B$。
