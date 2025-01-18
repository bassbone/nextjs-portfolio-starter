---
title: Dockerのoverlay2ディレクトリが肥大化してしまった場合の対処法
date: 2020/11/30
description: Dockerのoverlay2ディレクトリが肥大化してしまった場合の対処法
tag: Docker, 小ネタ
author: You
---

Dockerを頻繁に使用していると、知らぬ間にディスク使用率が100％になってしまうことがあります。  
その原因の一つとして、「`/var/lib/docker/overlay2`」のディレクトリが肥大化してしまうケースが挙げられます。  
このディレクトリの内容を直接削除するのは危険ですが、Dockerのコマンドを使うことで安全に削除できます。

---

## 1. Docker使用容量の確認

まずはDockerが使用しているディスク容量を確認します。  
`RECLAIMABLE`（再利用可能な容量）は、Dockerにおいて「現在使われていない（再利用できる）」イメージやコンテナの容量を示します。

```bash
$ sudo docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              15                  4                   3.728GB             1.904GB (51%)
Containers          8                   0                   543MB               543MB (100%)
Local Volumes       0                   0                   0B                  0B
Build Cache         0                   0                   0B                  0B
```

---

## 2. ディスク容量の確保

不要なコンテナ・ネットワーク・タグなしイメージ・ビルドキャッシュを削除するには、以下のコマンドを使用します。

```bash
$ sudo docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
xxx

Deleted Images:
deleted: sha256:xxx

Total reclaimed space: 2.368GB
```

約2.4GBの不要データが削除されました。

---

## 3. さらにディスクを開放する

`--all` オプションを付けると、使用されていない全てのイメージも削除できます。

```bash
$ sudo docker system prune --all
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] y
Deleted Images:
deleted: sha256:xxx

Total reclaimed space: 1.904GB
```

約1.9GB削除されました。ただし、  
**この操作を行うとコンテナビルドのキャッシュが削除されるため、再ビルド時の処理が遅くなる可能性があります。**

---

## 4. 結果の確認

削除後、ディスクの使用状況を再度確認すると、容量が解放されたことがわかります。

```bash
$ sudo docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              0                   0                   0B                  0B
Containers          0                   0                   0B                  0B
Local Volumes       0                   0                   0B                  0B
Build Cache         0                   0                   0B                  0B
```

---

## まとめ

ディスク容量の逼迫はDockerを使用する上で避けられない問題ですが、  
`docker system prune` コマンドを活用すれば、定期的なクリーンアップが可能になります。  
緊急時の対処だけでなく、定期的なメンテナンスとして実施することをおすすめします。
