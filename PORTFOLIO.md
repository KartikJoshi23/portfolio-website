# CollusionGraph — Graph Deep Learning for Financial & Procurement Collusion Detection

> One graph-learning system that screens two very different crimes — **money
> laundering** and **bid-rigging cartels** — by treating them as the same
> underlying problem: coordination between parties that leaves a structural
> fingerprint in a network.

*Deep Learning capstone · full-stack ML system, from raw public data to an
explained, interactive investigator console.*

---

## The problem

Money laundering and bid rigging look like completely different crimes — one
lives in bank transactions, the other in public-procurement records — but they
share one property that makes both genuinely hard to detect:

- **Neither crime can be committed alone.** Laundering needs a chain of accounts
  to move dirty money; a cartel needs at least two firms to secretly agree who
  wins a contract.
- **Any single participant looks completely ordinary.** Take one account out of
  a laundering ring, or one company out of a cartel, and it breaks no rule you
  could point at.

So the crime isn't in any one record — **it's in the arrangement between them.**
A model that scores customers one at a time is structurally blind to it. The
signal only exists in *who deals with whom*, which makes this a **network
(graph) problem**, not a spreadsheet one.

On top of that, the realistic version of the problem is brutally imbalanced and
under-labelled: in the primary dataset only **~2% of records are known-criminal
and ~77% carry no label at all** — you almost never get a clean answer key.

---

## What we built — the solution

An end-to-end system that turns six public datasets across both domains into a
short, **ranked and explained** queue of suspicious *groups* for a human
investigator, plus a research harness to evaluate it honestly where no answer
key exists.

### The pipeline (offline, deep-learning)

1. **Unified graph schema.** Every dataset is converted into one common
   intermediate representation — *nodes*, *edges*, *labels* — after which the
   system is domain-agnostic. A bank account and a construction firm become the
   same kind of object. This is what made a **single stack for both domains**
   (and cross-domain transfer experiments) possible.
2. **Four scoring arms, run in parallel** on the same graph:
   - **Supervised GNNs** — GATv2 (attention), GraphSAGE, R-GCN — trained with
     **focal loss** to survive the ~2% positive rate.
   - **Unsupervised graph anomaly detection** — DOMINANT & GAE autoencoders —
     which need *no labels* and carry the project's strongest deployment-realistic
     result.
   - **Hand-computed structural features** (degrees, motif counts, k-core,
     procurement bid-screens).
   - **Classical baselines** — XGBoost / LightGBM — as an honesty yardstick.
3. **Calibrated ensemble fusion.** Each model's scores are mapped onto a real
   probability scale (isotonic calibration) *before* being combined — a step
   that turned out to matter more than any single model (see Results).
4. **Community roll-up → ranked alert queue.** Leiden community detection groups
   the scored nodes; overlapping groups are de-duplicated (NMS-style) and the
   list is cut to a review budget the team can actually work.
5. **Explanation layer.** For each top alert: **PGExplainer** highlights the few
   connections the decision depended on (verified for sufficiency *and*
   necessity), a **rule-based motif matcher** names the pattern against **nine
   curated FATF / OECD collusion shapes**, and the matching official red-flag
   indicator is cited.

### The product (always-on, read-only)

- **Investigator Console** — a React/TypeScript dashboard: ranked queue, an
  interactive graph explorer, per-case evidence dossiers, a model-metrics lab, a
  live "plant fake cartels and measure recovery" stress-test view, and a
  methodology page.
- **GenAI Investigator Copilot** — a tool-grounded assistant (NVIDIA NIM LLM)
  that answers questions over the served results. It is **read-only, must ground
  every number in a tool lookup, auto-rewrites any guilt/accusation language, and
  passes a 24-question golden-test gate** before release.
- **Trust boundary by design.** The training pipeline writes files and exits;
  the serving side can only *read* them, so the public-facing service physically
  cannot retrain a model or alter a score — the security property and the low
  running cost fall out of the same decision.

---

## Key results & findings *(honest ones included)*

- **Where deep learning wins — and where it doesn't.** On the Bitcoin dataset,
  classical XGBoost (**AUC-PR ≈ 0.81**) *beats* our GNNs — reported openly,
  because that data ships pre-computed neighbourhood features the trees get for
  free. But in the **no-answer-key** regime (a real 488k-node / 1.45M-edge
  national contract network with fake cartels planted in), the trees *can't run
  at all* and the **unsupervised deep model recovers ~92% of bid-together
  cartels vs ~12% for a non-learning baseline** — deep learning doing something
  nothing else can.
- **Calibration before combining was the single highest-value fix:** averaging
  raw model scores collapsed the ensemble to ~blind-guessing level; calibrating
  first made it **~9× better**, same models and data.
- **The detector's blind spot is characterised, not hidden:** structure-only
  screening reliably catches cartels that *physically bid together* and is
  **blind to "take-turns" cartels** that never appear together — a precise,
  defensible statement of scope.
- **Cross-domain transfer is real but conditional:** procurement knowledge
  transfers positively across every auction market tested; the European-contracts
  model is market-dependent and its largest country underperforms — published
  per-fold rather than as a flattering average.
- **Statistical rigour throughout:** every headline model retrained across **5
  random seeds** (mean ± spread), paired-bootstrap significance tests,
  leave-one-country/market-out transfer matrices, and label-noise robustness
  curves.

---

## Tech stack

**Deep learning & graph ML**
`PyTorch` · `PyTorch Geometric` (GATv2 / GraphSAGE / R-GCN) · `PyGOD`
(DOMINANT / GAE graph anomaly detection) · `scikit-learn` (isotonic
calibration) · `XGBoost` · `LightGBM`

**Graph algorithms**
`NetworkX` · `python-igraph` · `leidenalg` (Leiden community detection) ·
custom motif matcher (9 FATF/OECD patterns)

**Data engineering**
`Polars` · `pandas` · `PyArrow` (Parquet) · `DuckDB` · `Pydantic` schemas ·
checksum-verified public-dataset ingestion adapters

**Serving & API**
`FastAPI` · `Uvicorn` · read-only artifact serving (torch-free) behind a
strict train/serve trust boundary

**GenAI / RAG**
`OpenAI` SDK → **NVIDIA NIM** (Nemotron) · custom **BM25** retrieval over a
cited knowledge base · deterministic grounding, numeric-sanity and
guilt-language guard-rails · golden-test gate

**Frontend**
`React` · `TypeScript` · `Vite` · `TailwindCSS` · `Zustand` · `TanStack
Query` + `Table` · `Motion` (Framer) & `GSAP` (animation) · `Sigma.js` +
`graphology` (interactive graph rendering) · WebGL fragment-shader backdrop ·
self-hosted variable fonts

**Experiment tracking & config**
`Hydra` · `Weights & Biases` · `PyYAML` · config-driven, seeded, reproducible runs

**Cloud architecture (designed & costed)**
`AWS` — S3 + CloudFront + WAF + Route 53 (serving) · Lambda → Fargate (compute)
· EventBridge + EC2 **spot GPU** (scheduled training) · Secrets Manager ·
CloudWatch · provider-enforced read-only IAM across the trust boundary

**Engineering & DevX**
`Docker` / `docker compose` · `uv` (packaging) · `pytest` (**~385 backend + 53
frontend tests**) · `ruff` · `black` · `mypy` · `pre-commit` · `gitleaks` ·
byte-reproducible artifacts verified across three machine classes

---

## Datasets

Six public datasets, two domains, nothing private — each ingested, measured
first-hand, and shipped as a download script + checksum (never redistributed):

| Dataset | Domain | Scale | Role |
|---|---|---|---|
| Elliptic / Elliptic++ | Money (Bitcoin) | 204k tx · 823k wallets | Primary labelled anchor |
| IBM AMLworld | Money (synthetic) | 515k accounts · 5M payments | Complete answer key + real amounts |
| García Rodríguez | Procurement (auctions) | 77k nodes, confirmed cartels | Records *losing* bids → real co-bid graph |
| Mendeley EU | Procurement (contracts) | 73 confirmed cartel cases | Primary procurement anchor |
| OCDS Georgia | Procurement (national) | 488k nodes · 1.45M edges | Large **unlabelled** injection-recovery playground |

---

## What makes it stand out

- **A single graph model that provably generalises across two unrelated crime
  domains**, with the transfer between them measured rather than assumed.
- **Honest evaluation with no answer key** — the injection-recovery / "stress
  test" methodology plants known-shape cartels into real unlabelled networks and
  measures how many come back.
- **Every alert is explainable and every claim is grounded** — verified
  explanations, cited regulatory indicators, and an AI assistant that cannot
  invent a number or assert guilt.
- **Built like a product, not a notebook** — reproducible pipeline, read-only
  serving with a real trust boundary, a full test suite, a costed cloud design,
  and an interactive console.
- **Ethics as a design driver, not a disclaimer** — every output is a *screening
  signal for a human*, never a determination of guilt, enforced at the code and
  UI level.
