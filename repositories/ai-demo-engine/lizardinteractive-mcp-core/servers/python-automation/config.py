import os
from pathlib import Path

# Dynamically resolve the lizardinteractive-mcp-core root directory (2 directories up)
SAFE_DIRECTORY = str(Path(__file__).resolve().parents[2])

# Save audits to the user's home directory (e.g., ~/mcp-audits on Linux or C:\Users\Name\mcp-audits on Win)
AUDIT_DIRECTORY = str(Path.home() / "mcp-audits")