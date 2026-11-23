"""Verify authored examples, solutions and check cases with real Python 3.

Run from any directory: python scripts/verify-python-curriculum.py
The browser runtime is checked separately by the browser QA script.
"""
import ast
import builtins
import contextlib
import io
import json
import os
from pathlib import Path
import tempfile
import tokenize

ROOT = Path(__file__).resolve().parents[1]
LESSONS = json.loads((ROOT / "lib/python-lab/lessons.json").read_text(encoding="utf-8"))


def execute(source, responses):
    lines = iter(responses.splitlines())
    namespace = {"__name__": "__main__", "__builtins__": dict(vars(builtins), input=lambda prompt="": next(lines))}
    output = io.StringIO()
    tree = ast.parse(source, filename="lesson.py")
    with contextlib.redirect_stdout(output):
        exec(compile(tree, "lesson.py", "exec"), namespace)
    return output.getvalue().rstrip(), namespace, tree


def required(source, tree, construct):
    if construct == "comment":
        return any(token.type == tokenize.COMMENT for token in tokenize.generate_tokens(io.StringIO(source).readline))
    if construct.startswith("call:"):
        name = construct.split(":", 1)[1]
        return any(isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == name for node in ast.walk(tree))
    return any(isinstance(node, getattr(ast, construct)) for node in ast.walk(tree))


def main():
    assert len(LESSONS) == 40
    assert len({lesson["id"] for lesson in LESSONS}) == 40
    assert all(sum(lesson["module"] == module for lesson in LESSONS) == 4 for module in range(1, 11))
    examples = cases = 0
    original = Path.cwd()
    with tempfile.TemporaryDirectory(prefix="python-lab-curriculum-") as directory:
        try:
            for lesson in LESSONS:
                prediction = lesson["prediction"]
                assert 0 <= prediction["right"] < len(prediction["options"]), lesson["id"]
                assert len(lesson["hints"]) >= 2 and lesson["young"] and lesson["everyday"]
                current = Path(directory) / lesson["id"]
                current.mkdir()
                os.chdir(current)
                actual, _, _ = execute(lesson["example"], lesson.get("input", ""))
                assert actual == lesson["exampleOutput"].rstrip(), (lesson["id"], "example", repr(actual))
                examples += 1
                for check in lesson["checks"]:
                    actual, namespace, tree = execute(lesson["solution"], check.get("input", ""))
                    assert actual == check["output"].rstrip(), (lesson["id"], "solution", repr(actual))
                    for construct in lesson.get("constructs", []):
                        assert required(lesson["solution"], tree, construct), (lesson["id"], construct)
                    if check.get("assertions"):
                        exec(check["assertions"], dict(namespace, ast=ast, tree=tree))
                    cases += 1
                print("PASS", lesson["id"])
        finally:
            os.chdir(original)
    print(json.dumps({"lessons": len(LESSONS), "examples_passed": examples, "solution_cases_passed": cases}))


if __name__ == "__main__":
    main()
